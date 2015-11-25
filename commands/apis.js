var client = require('../client');
var codes = require('../lib/codes')
var assembler = require('url-assembler');

var apisPath = assembler('/apis')
var apiPath = apisPath.segment('/:name');

exports.list = function (callback) {
  client
    .get(apisPath)
    .set('Accept', 'application/json')
    .expect(200)
    .end(function (err, res) {
      if (err) return callback(err);
      callback(null, res.body.data)
    })
};

exports.set = function (name, upstream_url, options, callback) {
  var id;
  client
    .get(apiPath.param({name}))
    .expect(codes(200, 404))
    .end(function (err, res) {
      if (err) return callback(err);
      id = res.body.id;
      client
        .put(apisPath)
        .send(Object.assign({id, name, upstream_url}, options))
        .end(function (err, res) {
          if (err) return callback(err);
          callback(null, res.body);
        })
    })
}

exports.remove = function (name, callback) {
  client
    .delete(apiPath.param({name}))
    .expect(codes(204, 404))
    .end(callback)
}

