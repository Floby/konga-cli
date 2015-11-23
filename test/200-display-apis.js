var utils = require('./utils');
var expect = utils.expect
var sinon = require('sinon');

var display = require('../lib/display');

describe('display.api', function () {
  describe('given an api object', function () {
    describe('with request_host', function () {
      it('returns its description in one line', function () {
        var expected = "my-api         my-api.com/               --> http://my-upstre.am";
        var api = {
          name: 'my-api',
          upstream_url: 'http://my-upstre.am',
          request_host: 'my-api.com'
        }
        var actual = display.api(api);
        expect(actual).to.equal(expected);
      })
    })

    describe('with a request path', function () {
      it('returns its description in one line', function () {
        var expected = "my-api         /my-api                   --> http://my-upstre.am";
        var api = {
          name: 'my-api',
          upstream_url: 'http://my-upstre.am',
          request_path: '/my-api'
        }
        var actual = display.api(api);
        expect(actual).to.equal(expected);
      })
    });

    describe('with both path and host', function () {
      it('returns its description in one line', function () {
        var expected = "my-api         my-api.com/my-api         --> http://my-upstre.am";
        var api = {
          name: 'my-api',
          upstream_url: 'http://my-upstre.am',
          request_host: 'my-api.com',
          request_path: '/my-api'
        }
        var actual = display.api(api);
        expect(actual).to.equal(expected);
      })
    });

    it('displays other settings in parens', function () {
        var expected = "my-api         my-api.com/               --> http://my-upstre.am (preserve_host, strip_request_path)";
        var api = {
          name: 'my-api',
          upstream_url: 'http://my-upstre.am',
          request_host: 'my-api.com',
          strip_request_path: true,
          preserve_host: true
        }
        var actual = display.api(api);
        expect(actual).to.equal(expected);
    });
  });
});
