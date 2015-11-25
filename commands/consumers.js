var assembler = require('url-assembler');
var client = require('../client');
var codes = require('../lib/codes');

var consumersPath = assembler('/consumers');
var consumerPath = consumersPath.segment('/:username');
var pluginPath = consumerPath.segment('/:plugin');

exports.set = function (username, callback) {
  client
    .get(consumerPath.param({username}))
    .expect(codes(200, 404))
    .end(function (err, res) {
      if (err) return callback(err)
      if (res.status === 200) {
        return callback(null, res.body);
      }
      client
        .put(consumersPath)
        .send({username})
        .expect(201)
        .end(function (err, res) {
          if (err) return callback(err);
          callback(null, res.body);
        })
    })
}

exports.plugin = function (username, plugin, config, callback) {
  var name = config.name;
  if (!name) {
    return setImmediate(_ => callback(Error('Konga requires a config.name')));
  }
  findPluginId(username, plugin, name, function (err, id) {
    client
      .put(pluginPath.param({username, plugin}))
      .send(Object.assign({id: id}, config))
      .expect(codes(200, 201))
      .end(function (err, res) {
        if (err) return callback(err);
        callback(null, res.body);
      })
  })

}

function findPluginId (username, plugin, name, callback) {
  client
    .get(pluginPath.param({username, plugin}))
    .expect(200)
    .end(function (err, res) {
      if (err) return callback(err);
      var plugin = res.body.data.find(plugin => plugin.name === name)
      callback(null, plugin ? plugin.id : undefined)
    })
}
