var sinon = require('sinon');
var utils = require('./utils');
var expect = utils.expect

var apiCommands = require('../commands/apis');
var display = require('../lib/display');
var program = require('../programs/api');

baseArgs = ['exec', 'bin']

var log = console.log;

describe('konga api', function () {
  var $api, $console, $display;
  beforeEach(() => $display = sinon.mock(display));
  afterEach(() => $display.restore());
  beforeEach(() => $console = sinon.mock(console));
  afterEach(() => $console.restore());
  beforeEach(() => $api = sinon.mock(apiCommands));
  afterEach(() => $api.restore());
  describe('list', function () {
    var args = baseArgs.concat(['list'])
    var a = {name: 1};
    var b = {name: 2};
    var apis = [a, b];
    it('calls apis.list and print the result', function () {
      $api.expects('list').callsArgWith(0, null, apis);
      $display.expects('api').withArgs(a).returns('api A')
      $display.expects('api').withArgs(b).returns('api B')
      $console.expects('log').withArgs('api A')
      $console.expects('log').withArgs('api B')

      program.parse(args);

      $api.verify();
      $display.verify()
      $console.verify()
    });
  })

  describe('remove <api-name>', function () {
    var args = baseArgs.concat(['remove', 'some-api'])
    it('calls apis.remove', function () {
      $api.expects('remove').withArgs('some-api').callsArg(1)

      program.parse(args)

      $api.verify()
    })
  });

  describe('set <api-name> <upstream-url>', function () {
    var host = 'hey'
    var path = "hoi"
    var args = baseArgs.concat(['set', 'some-api', 'http://upstre.am',
      '--request-host', host,
      '--request-path', path,
      '--strip-request-path', '--preserve-host'])

    it('calls apis.set with the correct config', function () {
      var api = {my:'api'};
      $api.expects('set').withArgs('some-api', 'http://upstre.am', {
        request_host: host,
        request_path: path,
        strip_request_path: true,
        preserve_host: true
      }).callsArgWith(3, null, api)
      $display.expects('api').withArgs(api).returns('API');
      $console.expects('log').withArgs('API');

      program.parse(args);

      $api.verify();
      $display.verify()
      $console.verify()
    });
  })
})
