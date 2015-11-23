var client = require('../client');
var codes = require('../lib/codes');

exports.set = function (username, callback) {
  client
    .get('/consumers/' + username)
    .expect(codes(200, 404))
    .end(function (err, res) {
      if (err) return done(err)
      if (res.status === 200) {
        return callback(null, res.body);
      }
      client
        .put('/consumers')
        .send({username})
        .expect(201)
        .end(function (err, res) {
          if (err) return callback(err);
          callback(null, res.body);
        })
    })
}
