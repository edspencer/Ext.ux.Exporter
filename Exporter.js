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
        title: grid.title,
        columns: grid.getColumnModel().config
      });
      
      // Base64.encode(formatter.format(grid.store, {title: this.title}));
      
      return Base64.encode(formatter.format(grid.store, config));
    }
  };
}();