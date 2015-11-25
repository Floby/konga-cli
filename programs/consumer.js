var program = require('commander');
var consumers = require('../commands/consumers');
var configurator = require('../lib/configurator');
var fail = require('../lib/fail');

program
  .command('set <username>')
  .action(function (username) {
    consumers.set(username, function (err, consumer) {
      if (err) fail(err);
      console.log(consumer)
    })
  })

program
  .command('plugin <username> <plugin-name> [fields...]')
  .action(function (username, plugin, fields, options) {
    consumers.plugin(username, plugin, configurator(fields), function (err, plugin) {
      if(err) fail(err);
      console.log(plugin);
    })
  })

module.exports = program;

