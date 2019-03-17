// @flow
import React, {Component} from 'react';
import {View} from 'react-native';
import {VerticalNumbers} from '../VerticalNumbers';
import {NumberRow} from '../NumberRow';
import {
  isNumber,
  numberToPlaceValue,
  placeValueToIndex,
  sumArray,
  sumArrayAtPlaceValue,
} from '../../utils/math-utils';

export class AdditionEquation extends Component<{
  addends: number[],
  focusedPlaceValue: ?number,
  sumInput: string,
  carryRow: string | number,
}> {
  render() {
    const {addends, focusedPlaceValue, sumInput, carryRow} = this.props;
    const displayAddends = carryRow ? [Number(carryRow), ...addends] : addends;

    let sumFocusedIndexes = [];
    if (isNumber(focusedPlaceValue)) {
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
          {displayAddends.map((num, i) => {
            const focusedIndex = placeValueToIndex(num, focusedPlaceValue);
            return (
              <NumberRow
                key={carryRow ? i : i + 1}
                value={num}
                focusedIndexes={
                  isNumber(focusedIndex) ? [focusedIndex] : undefined
                }
                isCarry={Boolean(carryRow && i === 0)}
              />
            );
          })}
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
