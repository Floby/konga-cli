module.exports = configurator;

function configurator (configs) {
  return configs.reduce((config, fieldSpec) => Object.assign(parseField(fieldSpec), config), {})
}

function parseField (fieldSpec) {
  if (!fieldSpec) return {}
  var split = fieldSpec.split('=')
  var name = split[0], value = split[1];
  return {[name]: value === undefined ? true : coerceValue(value)}
}

function coerceValue (value) {
  if (/true|false/.test(value)) {
    return value === 'true'
  } else if (value === '0') {
    return 0;
  } else if (Number(value)) {
    return Number(value);
  } else if (String(value).split(',').length > 1) {
    return String(value)
      .split(',')
      .map(v => v.trim())
      .filter(Boolean)
  } else {
    return value;
  }
}

configurator.parseField = parseField
