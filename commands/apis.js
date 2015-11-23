var client = require('../client');
var codes = require('../lib/codes')

exports.list = function (callback) {
  client
    .get('/apis')
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
    .get('/apis/' + name)
    .expect(codes(200, 404))
    .end(function (err, res) {
      if (err) return callback(err);
      id = res.body.id;
      client
        .put('/apis')
        .send(Object.assign({id, name, upstream_url}, options))
        .end(function (err, res) {
          if (err) return callback(err);
          callback(null, res.body);
        })
    })
}

exports.remove = function (name, callback) {
  client
    .delete('/apis/' + name)
    .expect(codes(204, 404))
    .end(callback)
}

