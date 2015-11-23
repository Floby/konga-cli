var supertest = require('supertest');
var config = require('./config');
var client = supertest(config.kong_url);

module.exports = client;
