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
