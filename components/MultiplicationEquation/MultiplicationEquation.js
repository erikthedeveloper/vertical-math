import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Hr} from '../Hr';
import {NumberRow} from './NumberRow';

export class MultiplicationEquation extends React.Component {
  state = {
    productRows: [561, '0'],
    product: '',
    multiplicandFocus: 2,
    multiplierFocus: 0,
    productRowsFocus: [1, -1],
  };

  render() {
    const {
      factors: [multiplicand, multiplier],
    } = this.props;
    const {
      product,
      productRows,
      multiplicandFocus,
      multiplierFocus,
      productRowsFocus,
    } = this.state;

    return (
      <View>
        <NumberRow value={multiplicand} focusedIndex={multiplicandFocus} />
        <NumberRow
          value={multiplier}
          focusedIndex={multiplierFocus}
          operator="multiplication"
        />
        <Hr />
        {productRows.map((productRow, i) => (
          <NumberRow
            key={i}
            value={productRow}
            focusedIndex={
              i === productRowsFocus[0] ? productRowsFocus[1] : null
            }
            operator={i === productRows.length - 1 ? 'addition' : null}
          />
        ))}
        <Hr />
        <NumberRow value={product} />
      </View>
    );
  }
}
