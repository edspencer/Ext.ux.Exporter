/**
 * @class Ext.ux.Exporter.Formatter
 * @author Ed Spencer (http://edspencer.net)
 * @cfg {Ext.data.Store} store The store to export
 */
Ext.ux.Exporter.Formatter = function(config) {
  config = config || {};
        
  Ext.applyIf(config, {
    
  });
};

Ext.ux.Exporter.Formatter.prototype = {
  /**
   * Performs the actual formatting. This must be overridden by a subclass
   */
  format: Ext.emptyFn
};