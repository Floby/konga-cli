module.exports = code;
var config = require('../config');

function code (codes) {
  codes = [].slice.call(arguments);
  return function (res) {
    if (codes.indexOf(res.status) === -1) {
      console.error(res.body);
      throw Error('unexpected status code ' + res.status);
    }
  }
}
