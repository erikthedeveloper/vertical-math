import React, {Component} from 'react';
import {View} from 'react-native';
import {VerticalNumbers} from '../VerticalNumbers';
import {NumberRow} from '../NumberRow';
import {
  numberToPlaceValue,
  placeValueToIndex,
  sumArray,
  sumArrayAtPlaceValue,
} from '../../utils/math-utils';

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
