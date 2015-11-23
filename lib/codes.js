module.exports = code;

function code (codes) {
  codes = [].slice.call(arguments);
  return function (res) {
    if (codes.indexOf(res.status) === -1) {
      throw Error('unexpected status code ' + res.status);
    }
  }
}
