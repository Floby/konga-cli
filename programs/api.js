var program = require('commander');
var apis = require('../commands/apis');
var fail = require('../lib/fail')
var display = require('../lib/display');

program
  .command('list')
  .action(function (truc) {
    apis.list(function (err, apis) {
      if (err) fail(err);
      apis.forEach(api => console.log(display.api(api)))
    })
  });

program
  .command('set <api-name> <upstream-url>')
  .option('--request-host <host>', 'The public DNS address that points to your API')
  .option('--request-path <path>', 'The public path that points to your API')
  .option('--strip-request-path', 'Strip the request_path value before proxying the request')
  .option('--preserve-host', 'Preserves the original Host header sent by the client')
  .action(function (name, upstream_url, options) {
    apis.set(name, upstream_url, {
      request_host: options.requestHost,
      request_path: options.requestPath,
      strip_request_path: options.stripRequestPath,
      preserve_host: options.preserveHost
    }, function (err, api) {
      if (err) fail(err);
      console.log(display.api(api))
    })
  });

program
  .command('remove <api-name>')
  .action(function (name) {
    apis.remove(name, function (err) {
      if (err) fail(err);
    });
  })

module.exports = program;
