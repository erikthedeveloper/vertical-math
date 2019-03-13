export function numberToPlaceValue(number) {
  return String(number).length - 1;
}

export function productForIndexes(factors, indexes) {
  const [aValue, bValue] = factors.map((factor, i) =>
    valueAtIndex(factor, indexes[i])
  );
  return aValue * bValue;
}

function valueAtIndex(number, i) {
  const aString = String(number);
  return Number(aString[i]) * Math.pow(10, aString.length - 1 - i);
}

export function sumArray(nums) {
  return nums.reduce((sum, num) => sum + num);
}

/**
 * Get the string index for place value. Examples:
 *  1, 0 -> 0
 *  10, 0 -> 1
 *  100, 1 -> 1
 *  1000, 1 -> 2
 *  1000, 5 -> null
 */
export function placeValueToIndex(num, placeValue) {
  const numPlaceValue = numberToPlaceValue(num);
  return !Number.isInteger(placeValue) || placeValue > numPlaceValue
    ? null
    : numPlaceValue - placeValue;
}

export function sumArrayAtPlaceValue(addends, placeValue) {
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
export function numberAtPlaceValue(number, placeValue) {
  const result = Number(String(number)[placeValueToIndex(number, placeValue)]);
  return Number.isInteger(result) ? result : 0;
}

export const sortAsc = (a, b) => a - b;

function generateAddend(min, max) {
  return Math.max(
    Math.round(Math.random() * min),
    Math.round(Math.random() * max)
  );
}

export function generateAddends(min, max) {
  const numAddends = Math.max(min, Math.round(Math.random() * max));
  return Array.from({length: numAddends})
    .map(() => generateAddend(50, 2500))
    .sort(sortAsc);
}
