module.exports = function (err, code) {
  console.error(err.message);
  process.exit(code || 127);
}
