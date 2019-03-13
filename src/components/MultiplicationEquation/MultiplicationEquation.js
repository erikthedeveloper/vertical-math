import * as React from 'react';
import {View} from 'react-native';
import {NumberRow} from '../NumberRow';
import {VerticalNumbers} from '../VerticalNumbers';
import {productForIndexes} from '../../utils/math-utils';
import {AdditionEquation} from '../AdditionEquation/AdditionEquation';

export class MultiplicationEquation extends React.Component {
  render() {
    const {
      factors: [multiplicand, multiplier],
      product,
      productRows,
      multiplicandFocus,
      multiplierFocus,
      productRowsFocus,
      additionMode,
    } = this.props;

    const productIsCorrect = Number(product) === multiplicand * multiplier;

    if (additionMode) {
      return (
        <View>
          <AdditionEquation
            addends={productRows}
            focusedPlaceValue={0}
            sumInput=""
            carryRow=""
          />
        </View>
      );
    }

    return (
      <View>
        <VerticalNumbers operator="multiplication">
          <NumberRow
            value={multiplicand}
            focusedIndexes={[multiplicandFocus]}
          />
          <NumberRow value={multiplier} focusedIndexes={[multiplierFocus]} />
        </VerticalNumbers>
        <VerticalNumbers operator="addition">
          {productRows.map((value, i) => {
            const rowIsCorrect =
              productForIndexes(
                [multiplicand, multiplier],
                [multiplicandFocus, multiplierFocus]
              ) === value;
            const rowIsFocused = i === productRowsFocus[0];
            return (
              <NumberRow
                key={i}
                value={value}
                focusedIndexes={[
                  !rowIsCorrect && rowIsFocused ? productRowsFocus[1] : null,
                ]}
                faded={!rowIsFocused}
                success={rowIsCorrect && rowIsFocused}
              />
            );
          })}
        </VerticalNumbers>
        <NumberRow value={product} success={productIsCorrect} />
      </View>
    );
  }
}
