// @flow
export function numberToPlaceValue(number: string | number): number {
  return String(number).length - 1;
}

export function productForIndexes(
  factors: [number, number],
  indexes: [number, number]
): number {
  const [aValue, bValue] = factors.map(
    (factor: number, i: number): number => valueAtIndex(factor, indexes[i])
  );
  return aValue * bValue;
}

function valueAtIndex(number: number, i: number): number {
  const aString = String(number);
  return Number(aString[i]) * Math.pow(10, aString.length - 1 - i);
}

export function sumArray(nums: number[]): number {
  return nums
    .map(Number)
    .reduce((sum: number, num: number): number => sum + num);
}

/**
 * Get the string index for place value. Examples:
 *  1, 0 -> 0
 *  10, 0 -> 1
 *  100, 1 -> 1
 *  1000, 1 -> 2
 *  1000, 5 -> null
 */
export function placeValueToIndex(
  num: number,
  placeValue: ?number
): null | number {
  const numPlaceValue = numberToPlaceValue(num);
  return !isNumber(placeValue) || placeValue > numPlaceValue
    ? null
    : numPlaceValue - placeValue;
}

export function sumArrayAtPlaceValue(
  addends: number[],
  placeValue: number
): number {
  return sumArray(
    addends.map(number => numberAtPlaceValue(number, placeValue))
  );
}

/**
 * Get the single digit number at place value. Examples:
 *   159, 0 -> 9
 *   159, 1 -> 5
 *   159, 2 -> 0
 */
export function numberAtPlaceValue(number: number, placeValue: number): number {
  const index = placeValueToIndex(number, placeValue);
  return isNumber(index) ? Number(String(number)[index]) : 0;
}

type SortFunc = (number, number) => number;
export const sortAsc: SortFunc = (a, b) => a - b;
export const sortDesc: SortFunc = (a, b) => b - a;

function generateAddend(min: number, max: number): number {
  return Math.max(
    Math.round(Math.random() * min),
    Math.round(Math.random() * max)
  );
}

export function generateAddends(min: number, max: number): number[] {
  const numAddends = Math.max(min, Math.round(Math.random() * max));
  return Array.from({length: numAddends})
    .map((): number => generateAddend(50, 2500))
    .sort(sortAsc);
}

export function isNumber(value: mixed): boolean %checks {
  return typeof value === 'number';
}
