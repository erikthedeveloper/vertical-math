import React, {Component} from 'react';
import {View} from 'react-native';
import {VerticalNumbers} from '../VerticalNumbers';
import {NumberRow} from '../NumberRow';
import {numberToPlaceValue} from '../../utils/math-utils';

export class AdditionEquation extends Component {
  render() {
    const {addends, focusedPlaceValue, sumInput, carryRow} = this.props;
    const sumActual = sumArray(addends);
    const sumIsCorrect = Number(sumInput) === sumActual;
    const displayAddends = carryRow ? [carryRow, ...addends] : addends;
    const focusedAddendsSum = sumArrayAtPlaceValue(
      displayAddends,
      focusedPlaceValue
    );
    const sumFocusedIndex = placeValueToIndex(sumInput, focusedPlaceValue);

    return (
      <View>
        <VerticalNumbers operator="addition">
          {displayAddends.map((num, i) => {
            return (
              <NumberRow
                key={i}
                value={num}
                focusedIndexes={[placeValueToIndex(num, focusedPlaceValue)]}
                isCarry={carryRow && i === 0}
              />
            );
          })}
        </VerticalNumbers>
        <NumberRow
          value={sumInput}
          success={sumIsCorrect}
          focusedIndexes={
            Number.isInteger(sumFocusedIndex)
              ? sumFocusedIndex === 1
                ? [0, 1]
                : [0]
              : Number.isInteger(focusedPlaceValue)
              ? String(focusedAddendsSum).length === 2
                ? [-2, -1]
                : [-1]
              : [null]
          }
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
