var nock = require('nock');
var config = require('../config');
config.kong_url = 'http://kong-host:8001';

var chai = require("chai");
var sinon = require("sinon");
sinon.assert.expose(chai.assert, { prefix: "" });

exports.nock = function () {
  return nock('http://kong-host:8001')
};

exports.expect = chai.expect;
