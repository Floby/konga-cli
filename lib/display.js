var printf = require('printf');

exports.api = function (api) {
  var request = printf('%s%s', api.request_host || '', api.request_path || '/');
  var flags = ['preserve_host', 'strip_request_path']
    .map(field => api[field] && field)
    .filter(Boolean)
    .join(', ')
  if (flags) flags = printf(' (%s)', flags);
  return printf('%-15s%-25s --> %s', api.name, request, api.upstream_url) + flags;
}

exports.config = function (config, fields, raw) {
  return fields
    .filter(field => config.hasOwnProperty(field))
    .map(format)
    .join('\n')

  function format (field) {
    if (raw) return config[field]
    else return printf('%-30s %s', field + ':', config[field])
  }
}
