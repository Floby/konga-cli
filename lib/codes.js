var util = require('util');
var config = require('../config');

module.exports = code;

function code (codes) {
  codes = [].slice.call(arguments);
  return function (res) {
    if (codes.indexOf(res.status) === -1) {
      var msg = util.format('Unexpected status code %d: %j', res.status, res.body);
      throw Error(msg);
    }
  }
}
