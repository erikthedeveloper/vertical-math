import React, {Component} from 'react';
import {View} from 'react-native';
import {VerticalNumbers} from '../VerticalNumbers';
import {NumberRow} from '../NumberRow';
import {numberToPlaceValue} from '../../utils/math-utils';

export class AdditionEquation extends Component {
  render() {
    const {addends, focusedPlaceValue, sumInput, carryRow} = this.props;
    const displayAddends = carryRow ? [carryRow, ...addends] : addends;

    let sumFocusedIndexes = [];
    if (Number.isInteger(focusedPlaceValue)) {
      const focusedIsEmpty = numberToPlaceValue(sumInput) < focusedPlaceValue;
      const focusedAddendsSum = sumArrayAtPlaceValue(
        displayAddends,
        focusedPlaceValue
      );
      sumFocusedIndexes = String(focusedAddendsSum)
        .split('')
        .map((_, i) => (focusedIsEmpty ? -1 - i : i));
    }

    return (
      <View>
        <VerticalNumbers operator="addition">
          {displayAddends.map((num, i) => (
            <NumberRow
              key={i}
              value={num}
              focusedIndexes={[placeValueToIndex(num, focusedPlaceValue)]}
              isCarry={carryRow && i === 0}
            />
          ))}
        </VerticalNumbers>
        <NumberRow
          value={sumInput}
          success={Number(sumInput) === sumArray(addends)}
          focusedIndexes={sumFocusedIndexes}
        />
      </View>
    );
  }
}

function sumArray(nums) {
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
function placeValueToIndex(num, placeValue) {
  const numPlaceValue = numberToPlaceValue(num);
  return !Number.isInteger(placeValue) || placeValue > numPlaceValue
    ? null
    : numPlaceValue - placeValue;
}

function sumArrayAtPlaceValue(addends, placeValue) {
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
function numberAtPlaceValue(number, placeValue) {
  const result = Number(String(number)[placeValueToIndex(number, placeValue)]);
  return Number.isInteger(result) ? result : 0;
}
