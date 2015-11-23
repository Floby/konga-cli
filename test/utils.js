var nock = require('nock');
var config = require('../config');
config.kong_url = 'http://kong-host:8001';

exports.nock = function () {
  return nock('http://kong-host:8001')
};

exports.expect = require('chai').expect;
