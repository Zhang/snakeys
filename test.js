var snakeys = require('./index');
var camelToSnakeCase = require('./camelToSnakeCase');

var date = new Date;
var testObject = { test: 'object' };
var testArray = ['test'];
var testFunction = function() { return 'test' };
var testError = new Error('test');

var testCasing = [
  ['Aaa', 'Aaa'],
  ['aBa', 'a_ba'],
  ['testThis', 'test_this'],
  ['a00Bc', 'a00_bc'],
  ['ThisCase', 'This_case'],
  ['ThisIsAMuchLongerString', 'This_is_a_much_longer_string'],
  ['AAAAA', 'A_a_a_a_a'],
  ['This string has spaces', 'This string has spaces'],
  ['This string NEeds ToBe Transformed', 'This string N_eeds To_be Transformed'],
  ['this.canWork', 'this.can_work'],
  ['%aB$$D@V', '%a_b$$_d@_v'],
  ['T', 'T'],
  ['', ''],
  [date, date],
  [1, 1],
  [22, 22],
  [testFunction, testFunction],
  [testArray, testArray],
  [testObject, testObject],
  [null, null],
  [undefined, undefined],
  [testError, testError],
];

testCasing.forEach(function(testCase) {
  if (camelToSnakeCase(testCase[0]) !== testCase[1]) {
    console.log('Error with test case: ' + testCase);
    console.log('Expected: ' + testCase[1]);
    console.log('Got: ' + camelToSnakeCase(testCase[0]));
  }
});

var testCases = [
  [{ testString: 'result' }, { test_string: 'result' }],
  [{ dontsnake: 'result' }, { dontsnake: 'result' }],
  [{ '%special$Ymbols': 'result' }, { '%special$_ymbols': 'result' }],
  [{ snake_cased: 'result' }, { snake_cased: 'result' }],
  [{ snake_Capped: 'result' }, { snake_Capped: 'result' }],
  [{ deep: { Ly: { nesTed: 'obj' } } }, { deep: { Ly: { nes_ted: 'obj' } } }],
  [{ wUt: {}, the: '', javaScript: null }, { w_ut: {}, the: '', java_script: null }],
];

var identities = [
  [testFunction, testFunction],
  [testArray, testArray],
  [null, null],
  [NaN, NaN],
  [undefined, undefined],
  [testError, testError],
  [date, date],
  [1, 1],
  [22, 22],
  ['', ''],
];

var shouldError = {testForThis: '', test_for_this: ''};

testCases.forEach(function(testCase) {
  if (JSON.stringify(snakeys(testCase[0])) !== JSON.stringify(testCase[1])) {
    console.log('Error for test case: ', testCase[0]);
  }
})

identities.forEach(function(testCase) {
  if (JSON.stringify(snakeys(testCase[0])) !== JSON.stringify(testCase[1])) {
    console.log('Error for test case: ', testCase[0]);
  }
})

try {
  snakeys(shouldError)
  console.log('Error for test case: shouldError')
}
catch(e) {};
