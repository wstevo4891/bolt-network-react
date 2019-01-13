// test/javascript/lodash.test.js

import _ from 'lodash';

// _.chunk() returns a nested array grouped by the int param
test('can use loadash.chunk', () => {
  let arr = ['a', 'b', 'c', 'd'];
  const result = _.chunk(arr, 2);

  expect(result).toEqual([['a', 'b'], ['c', 'd']]);
});

// _.compact(array) returns array with falsey values removed 
test('can use lodash.compact', () => {
  let arr = [1, 0, 2, false, 3, null];
  const result = _.compact(arr);

  expect(result).toEqual([1, 2, 3]);
});
