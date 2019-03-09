import React, {Component} from 'react';
import {View} from 'react-native';
import {VerticalNumbers} from '../VerticalNumbers';
import {NumberRow} from '../NumberRow';

export class AdditionEquation extends Component {
  render() {
    const {addends, addendsFocusXedni, sumInput, carryRow} = this.props;
    const sumActual = sumArray(addends);
    const sumIsCorrect = Number(sumInput) === sumActual;
    const displayAddends = carryRow ? [carryRow, ...addends] : addends;
    const displayAddendsFocuses = displayAddends.map(num =>
      xedniToIndex(num, addendsFocusXedni)
    );
    const focusedAddendsColumnSum = sumArray(
      displayAddends
        .map(String)
        .map((numStr, i) => numStr[displayAddendsFocuses[i]])
        .map(Number)
    );
    const sumFocusedIndex = xedniToIndex(sumInput, addendsFocusXedni);

    return (
      <View>
        <VerticalNumbers operator="addition">
          {displayAddends.map((num, i) => {
            return (
              <NumberRow
                key={i}
                value={num}
                focusedIndexes={[displayAddendsFocuses[i]]}
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
              : Number.isInteger(addendsFocusXedni)
              ? String(focusedAddendsColumnSum).length === 2
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

function xedniToIndex(num, xedni) {
  const numDigits = String(num).length;
  let index;
  if (Number.isInteger(xedni) && xedni < numDigits) {
    index = numDigits - 1 - xedni;
  }
  return index;
}
