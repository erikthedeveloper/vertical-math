import {Alert} from 'react-native';

export const NEW_PRODUCT_ROW = 'NEW_PRODUCT_ROW';
export const INPUT_NUMBER = 'INPUT_NUMBER';
export const INPUT_SOLUTION = 'INPUT_SOLUTION';
const RESET = 'RESET';
export const ACCEPT_SOLUTION = 'ACCEPT_SOLUTION';

const initialState = {
  factors: [24, 36],
  productRows: [],
  product: '',
  multiplicandFocus: null,
  multiplierFocus: null,
  productRowsFocus: [null, null],
  completed: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_PRODUCT_ROW: {
      const {multiplicandFocus, multiplierFocus, zeroes} = action;
      const productRows = [...state.productRows, zeroes];
      return {
        ...state,
        productRows,
        multiplicandFocus,
        multiplierFocus,
        productRowsFocus: [productRows.length - 1, -1],
      };
    }

    case INPUT_NUMBER: {
      const {productRowIndex, value} = action;
      const productRows = state.productRows.slice();
      productRows[productRowIndex] = Number(
        String(value) + productRows[productRowIndex]
      );
      return {
        ...state,
        productRows,
        productRowsFocus: [productRowIndex, 0],
      };
    }

    case INPUT_SOLUTION: {
      return {
        ...state,
        product: action.value,
        multiplicandFocus: initialState.multiplicandFocus,
        multiplierFocus: initialState.multiplierFocus,
        productRowsFocus: initialState.productRowsFocus,
      };
    }

    case ACCEPT_SOLUTION:
      setTimeout(() => {
        Alert.alert('Correct!', '💯 You solved the equation! 💯');
      }, 500);
      return {...initialState, product: state.product, completed: true};

    default:
      return state;
  }
}
