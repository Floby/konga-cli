var client = require('../client');
var codes = require('../lib/codes')
var assembler = require('url-assembler');

var apisPath = assembler('/apis');
var apiPath = apisPath.segment('/:api')
var pluginsPath = apiPath.segment('/plugins');
var pluginPath = pluginsPath.segment('/:id');

exports.list = function (api, callback) {
  client
    .get(pluginsPath.param({api}))
    .expect(200)
    .end(function (err, res) {
      if (err) return callback(err);
      callback(null, res.body.data)
    })
}

exports.set = function (api, name, config, callback) {
  getPluginId(api, name, function (err, id) {
    if (err) return callback(err);
    client
      .put(pluginsPath.param({api}))
      .send({id, name, config})
      .expect(codes(200, 201))
      .end(function (err, res) {
        if (err) return callback(err);
        callback(null, res.body);
      })
  })
}
        
       
exports.readConfig = function (api, name, callback) {
  getPluginId(api, name, function (err, id) {
    if (err) return callback(err);
    client
      .get(pluginPath.param({api, id}))
      .expect(200)
      .end(function (err, res) {
        if (err) return callback(err);
        callback(null, res.body.config);
      })
  })
}

function getPluginId (api, name, callback) {
  client
    .get(pluginsPath.param({api}))
    .expect(200)
    .end(function (err, res) {
      if (err) return callback(err);
      var plugin = res.body.data.filter(plugin => plugin.name === name).shift() || {};
      callback(null, plugin.id);
  })
}
