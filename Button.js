/**
 * @class Ext.ux.Exporter.Button
 * @extends Ext.Button
 * @author Nige White, with modifications from Ed Spencer
 * Specialised Button class that allows downloading of data via data: urls.
 * Internally, this is just a link.
 * Pass it either an Ext.Component subclass with a 'store' property, or just a store:
 * new Ext.ux.Exporter.Button({component: someGrid});
 * new Ext.ux.Exporter.Button({store: someStore});
 * @cfg {Ext.Component} component The component the store is bound to
 * @cfg {Ext.data.Store} store The store to export (alternatively, pass a component with a store property)
 */
Ext.ux.Exporter.Button = Ext.extend(Ext.Button, {
  constructor: function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
      exportFunction: 'exportGrid',
      disabled      : true,
      text          : 'Download',
      cls           : 'download'
    });
    
    if (config.store == undefined && config.component != undefined) {
      Ext.applyIf(config, {
        store: config.component.store
      });
    } else {
      Ext.applyIf(config, {
        component: {
          store: config.store
        }
      });
    }
    
    Ext.ux.Exporter.Button.superclass.constructor.call(this, config);
    
    if (this.store && Ext.isFunction(this.store.on)) {
      var setLink = function() {
        this.getEl().child('a', true).href = 'data:application/vnd.ms-excel;base64,' + Ext.ux.Exporter[config.exportFunction](this.component, null, config);
        
        this.enable();
      };
      
      if (this.el) {
        setLink.call(this);
      } else {
        this.on('render', setLink, this);
      }
      
      this.store.on('load', setLink, this);
    }
  },
  
  template: new Ext.Template(
    '<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>',
    '<td class="x-btn-left"><i> </i></td><td class="x-btn-center"><a class="x-btn-text" href="{1}" target="{2}">{0}</a></td><td class="x-btn-right"><i> </i></td>',
    "</tr></tbody></table>"),

    onRender:   function(ct, position){
      var btn, targs = [this.text || ' ', this.href, this.target || "_self"];
      if (position){
        btn = this.template.insertBefore(position, targs, true);
      }else{
        btn = this.template.append(ct, targs, true);
      }
      var btnEl = btn.child("a:first");
      this.btnEl = btnEl;
      btnEl.on('focus', this.onFocus, this);
      btnEl.on('blur', this.onBlur, this);

      this.initButtonEl(btn, btnEl);
      Ext.ButtonToggleMgr.register(this);
    },

    onClick : function(e){
      if (e.button != 0) return;
      
      if (!this.disabled){
        this.fireEvent("click", this, e);
        
        if (this.handler) this.handler.call(this.scope || this, this, e);
      }
    }
});

Ext.reg('exportbutton', Ext.ux.Exporter.Button);