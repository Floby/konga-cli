var program = require('commander');
var plugins = require('../commands/plugins');
var fail = require('../lib/fail');
var configurator = require('../lib/configurator');
var display = require('../lib/display');

program
  .command('list')
  .option('--on <api-name>', 'the API whose plugin to list')
  .action(function (options) {
    apiRequired(options)
    plugins.list(options.on, function (err, plugins) {
      if (err) fail(err);
      console.log(plugins)
    })
  })

program
  .command('set <plugin-name> [fields...]')
  .option('--on <api-name>', 'the API on which to configure the plugin')
  .action(function (plugin, fields, options) {
    apiRequired(options)
    var config = configurator(fields);
    plugins.set(options.on, plugin, configurator(fields), function (err, result) {
      if (err) fail(err);
      console.log(result);
    })
  })

program
  .command('read-config <plugin-name> [fields...]')
  .option('--on <api-name>', 'the API on which to read the plugin configuration')
  .option('--raw', 'only display values without their name')
  .action(function (plugin, fields, options) {
    apiRequired(options);
    plugins.readConfig(options.on, plugin, function (err, config) {
      if (err) fail(err);
      fields = fields.length ? fields : Object.keys(config);
      console.log(display.config(config, fields, options.raw));
    })
  })


function apiRequired (options) {
  if (typeof options.on !== 'string') {
    fail(Error("you MUST specify a target API with the --on <api-name> option"))
  }
}

module.exports = program;
