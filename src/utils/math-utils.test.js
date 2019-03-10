import {numberToPlaceValue, productForIndexes} from './math-utils';

describe('numberToPlaceValue', () => {
  [
    [0, 0],
    [5, 0],
    [55, 1],
    ['55', 1],
    [555, 2],
    [5123456789123456, 15],
  ].forEach(([number, expected]) => {
    test(`numberToPlaceValue(${number}) -> ${expected}`, () => {
      expect(numberToPlaceValue(number)).toEqual(expected);
    });
  });
});

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
