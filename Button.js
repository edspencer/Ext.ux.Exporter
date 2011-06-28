/**
 * @class Ext.ux.Exporter.Button
 * @extends Ext.Button
 * @author Nige White, with modifications from Ed Spencer, with modifications from iwiznia.
 * Specialised Button class that allows downloading of data via data: urls.
 * Internally, this is just a link.
 * Pass it either an Ext.Component subclass with a 'store' property, or just a store or nothing and it will try to grab the first parent of this button that is a grid or tree panel:
 * new Ext.ux.Exporter.Button({component: someGrid});
 * new Ext.ux.Exporter.Button({store: someStore});
 * @cfg {Ext.Component} component The component the store is bound to
 * @cfg {Ext.data.Store} store The store to export (alternatively, pass a component with a getStore method)
 */
Ext.define("Ext.ux.exporter.Button", {
    extend: "Ext.Button",
    alias: "widget.exporterbutton",
    constructor: function(config) {
      config = config || {};

      Ext.applyIf(config, {
        disabled      : true,
        text          : 'Download',
        cls           : 'download',
        href          : "/"
      });

      Ext.ux.exporter.Button.superclass.constructor.call(this, config);

      if (this.store || this.component) {
          this.setComponent(this.store || this.component, config);
      } else {
          var self = this;
          this.on("render", function() { // We wait for the combo to be rendered, so we can look up to grab the component containing it
              self.setComponent(self.up("gridpanel") || self.up("treepanel"), config);
          });
      }
    },

    setComponent: function(component, config) {
        this.component = component;
        this.store = !component.is ? component : component.getStore(); // only components or stores, if it doesn't respond to is method, it's a store
        var setLink = function() {
          var newConf = Ext.clone(config);
          this.el.query('a', true)[0].href = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Exporter.exportAny(this.component, null, newConf);
          this.enable();
        };

        var me = this;
        this.store.on("load", setLink, this);
        if(Ext.ComponentQuery.is(this.component, "gridpanel")) {
            Ext.Array.each(this.component.columns, function(col) {
                col.on("show", setLink, me);
                col.on("hide", setLink, me);
            });
        }
    },

    onClick : function(e){
        if (e.button != 0) return;

        if (!this.disabled){
          this.fireEvent("click", this, e);

          if (this.handler) this.handler.call(this.scope || this, this, e);
        }
    }
});