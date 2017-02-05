var camelToSnakeCase = require('./camelToSnakeCase');

module.exports = function snakeys(object) {
  if (
    !object ||
    object instanceof Date ||
    Array.isArray(object) ||
    typeof object !== 'object' ||
    object instanceof Error
  ) { return object; }

  return Object.keys(object).reduce(function(snaked, key) {
    var newKey = camelToSnakeCase(key);
    if (newKey in snaked) {
      throw new Error('Duplicate key: ' + newKey + ' found when snake casing object keys');
    }

    snaked[camelToSnakeCase(key)] = snakeys(object[key]);
    return snaked;
  }, {});
}
