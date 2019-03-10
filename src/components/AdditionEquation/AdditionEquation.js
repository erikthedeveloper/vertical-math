import React, {Component} from 'react';
import {View} from 'react-native';
import {VerticalNumbers} from '../VerticalNumbers';
import {NumberRow} from '../NumberRow';

export class AdditionEquation extends Component {
  render() {
    const {addends, focusedPlaceValue, sumInput, carryRow} = this.props;
    const sumActual = sumArray(addends);
    const sumIsCorrect = Number(sumInput) === sumActual;
    const displayAddends = carryRow ? [carryRow, ...addends] : addends;
    const focusedAddendsSum = addendsSumAtPlaceValue(
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

function placeValueToIndex(num, placeValue) {
  const numDigits = String(num).length;
  return Number.isInteger(placeValue) && placeValue < numDigits
    ? numDigits - 1 - placeValue
    : null;
}

function addendsSumAtPlaceValue(addends, placeValue) {
  return sumArray(
    addends
      .map(String)
      .map(numStr => numStr[placeValueToIndex(numStr, placeValue)])
      .map(Number)
  );
}
