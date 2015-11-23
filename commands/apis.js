var client = require('../client');

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
    .expect(function (res) {
      if (res.status !== 200 && res.status !== 404) {
        throw Error('unexpected code ' + res.status);
      }
    })
    .end(function (err, res) {
      if (err) return callback(err);
      id = res.body.id;
      client
        .put('/apis')
        .send(Object.assign({id, name, upstream_url}, options))
        .end(function (err, res) {
          if (err) return callback(err);
          callback(null, res.body.data);
        })
    })
}
