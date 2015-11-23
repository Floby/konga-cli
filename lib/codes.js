module.exports = code;

function code (codes) {
  codes = [].slice.call(arguments);
  return function (res) {
    if (!res) {
      throw Error ('Admin not reachable on ' + config.kong_url);
    }
    if (codes.indexOf(res.status) === -1) {
      console.error(res.body);
      throw Error('unexpected status code ' + res.status);
    }
  }
}
