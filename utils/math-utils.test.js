import {productForIndexes} from './math-utils';

describe('productForIndexes', () => {
  [
    // Walk through an entire "vertical multiplication" problem
    [[15, 22], [1, 1], 10],
    [[15, 22], [0, 1], 20],
    [[15, 22], [1, 0], 100],
    [[15, 22], [0, 0], 200],
    // Other examples
    [[100, 10], [2, 1], 0],
    [[100, 10], [0, 0], 1000],
    [[555, 555], [2, 2], 25],
    [[555, 555], [1, 1], 2500],
    [[555, 555], [0, 0], 250000],
  ].forEach(([factors, indexes, expected]) => {
    test(`${factors} at ${indexes} === ${expected}`, () => {
      expect(productForIndexes(factors, indexes)).toEqual(expected);
    });
  });
});
