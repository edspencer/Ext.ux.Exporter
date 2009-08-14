/**
 * @class Ext.ux.Exporter
 * @author Ed Spencer (http://edspencer.net)
 * Class providing a common way of downloading data in .xls or .csv format
 */
Ext.ux.Exporter = function() {
  return {
    /**
     * Exports a grid, using the .xls formatter by default
     * @param {Ext.grid.GridPanel} grid The grid to export from
     * @param {Object} config Optional config settings for the formatter
     */
    exportGrid: function(grid, formatter, config) {
      config = config || {};
      formatter = formatter || new Ext.ux.Exporter.ExcelFormatter();
      
      Ext.applyIf(config, {
        title  : grid.title,
        columns: grid.getColumnModel().config
      });
      
      return Base64.encode(formatter.format(grid.store, config));
    },
    
    exportStore: function(store, formatter, config) {
       config = config || {};
       formatter = formatter || new Ext.ux.Exporter.ExcelFormatter();

       Ext.applyIf(config, {
         columns: config.store.fields.items
       });
       
       return Base64.encode(formatter.format(store, config));
    },
    
    exportTree: function(tree, formatter, config) {
      config    = config || {};
      formatter = formatter || new Ext.ux.Exporter.ExcelFormatter();
      
      var store = tree.store || config.store;

      Ext.applyIf(config, {
        title: tree.title
      });
      
      return Base64.encode(formatter.format(store, config));
    }
  };
}();