/**
 * @class Ext.ux.ExportButton
 * @extends Ext.Button
 * Specialised Button class that allows downloading of data via data: urls.
 * Internally, this is just a link
 */
Ext.ux.ExportButton = Ext.extend(Ext.Button, {

  initComponent: function() {
    Ext.applyIf(this, {
      
    });
    
    Ext.ux.ExportButton.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('exportbutton', Ext.ux.ExportButton);