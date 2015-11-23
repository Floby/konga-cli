var client = require('../client');
var codes = require('../lib/codes')

exports.list = function (name, callback) {
  client
    .get('/apis/' + name + '/plugins')
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
      .put('/apis/' + api + '/plugins')
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
      .get('/apis/' + api + '/plugins/' + id)
      .expect(200)
      .end(function (err, res) {
        if (err) return callback(err);
        callback(null, res.body.config);
      })
  })
}

function getPluginId (api, name, callback) {
  client
    .get('/apis/' + api + '/plugins')
    .expect(200)
    .end(function (err, res) {
      if (err) return callback(err);
      var plugin = res.body.data.filter(plugin => plugin.name === name).shift() || {};
      callback(null, plugin.id);
  })
}
