var supertest = require('supertest');
var config = require('./config');

var Test = require('supertest/lib/test');

originalAssert = Test.prototype.assert;
Test.prototype.assert = function kongaAssert(resError, res, fn){
  if (!res && resError) return fn.call(this, resError);
  return originalAssert.call(this, resError, res, fn);
};

var client = supertest(config.kong_url);
module.exports = client;
