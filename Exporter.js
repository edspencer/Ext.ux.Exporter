/**
 * @class Ext.ux.Exporter
 * @author Ed Spencer (http://edspencer.net), with modifications from iwiznia.
 * Class providing a common way of downloading data in .xls or .csv format
 */
Ext.define("Ext.ux.exporter.Exporter", {
    uses: [
        "Ext.ux.exporter.Base64",
        "Ext.ux.exporter.Button",
        "Ext.ux.exporter.csvFormatter.CsvFormatter",
        "Ext.ux.exporter.excelFormatter.ExcelFormatter"
    ],

    statics: {
        exportAny: function(component, formatter, config) {
            var func = "export";
            if(!component.is) {
                func = func + "Store";
            } else if(component.is("gridpanel")) {
                func = func + "Grid";
            } else if (component.is("treepanel")) {
                func = func + "Tree";
            }
            return this[func](component, formatter, config);
        },

        /**
         * Exports a grid, using the .xls formatter by default
         * @param {Ext.grid.GridPanel} grid The grid to export from
         * @param {Object} config Optional config settings for the formatter
         */
        exportGrid: function(grid, formatter, config) {
          config = config || {};
          formatter = formatter || new Ext.ux.exporter.excelFormatter.ExcelFormatter();

          Ext.applyIf(config, {
            title  : grid.title,
            columns: grid.columns
          });

          return Ext.ux.exporter.Base64.encode(formatter.format(grid.store, config));
        },

        exportStore: function(store, formatter, config) {
           config = config || {};
           formatter = formatter || new Ext.ux.exporter.excelFormatter.ExcelFormatter();

           Ext.applyIf(config, {
             columns: config.store.fields.items
           });

           return Ext.ux.exporter.Base64.encode(formatter.format(store, config));
        },

        exportTree: function(tree, formatter, config) {
          config    = config || {};
          formatter = formatter || new Ext.ux.exporter.excelFormatter.ExcelFormatter();

          var store = tree.store || config.store;

          Ext.applyIf(config, {
            title: tree.title
          });

          return Ext.ux.exporter.Base64.encode(formatter.format(store, config));
        }
    }
});