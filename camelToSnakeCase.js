module.exports = function camelToSnakeCase(input) {
  if (typeof input !== 'string') { return input; }

  output = ''

  for (var i = 0; i < input.length; i++ ) {
    if ((/[A-Z]/).test(input[i]) && i !== 0 && input[i - 1] !== ' '  && input[i - 1] !== '_') {
      output += '_' + input[i].toLowerCase();
    } else {
      output += input[i];
    }
  }

  return output;
}
