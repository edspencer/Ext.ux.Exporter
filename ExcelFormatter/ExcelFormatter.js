/**
 * @class Ext.ux.Exporter.ExcelFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .xls files
 */
Ext.ux.Exporter.ExcelFormatter = Ext.extend(Ext.ux.Exporter.Formatter, {
  
  format: function(store, config) {
    var workbook = new Ext.ux.Exporter.ExcelFormatter.Workbook(config);
    workbook.addWorksheet(store, config || {});
    
    return workbook.render();
  }
});
