import {numberToPlaceValue} from '../utils/math-utils';

export const NEW_PROBLEM = 'NEW_PROBLEM';
export const NEW_PRODUCT_ROW = 'NEW_PRODUCT_ROW';
export const INPUT_NUMBER = 'INPUT_NUMBER';
export const INPUT_SOLUTION = 'INPUT_SOLUTION';
export const BEGIN_ADDITION = 'BEGIN_ADDITION';

const initialState = {
  factors: [],
  productRows: [],
  product: '',
  multiplicandFocus: null,
  multiplierFocus: null,
  productRowsFocus: [null, null],
  additionMode: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_PROBLEM: {
      return {...initialState, factors: action.factors};
    }

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
      // May begin with "0"
      productRows[productRowIndex] =
        String(value) + productRows[productRowIndex];
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

    case BEGIN_ADDITION:
      return {
        ...state,
        additionMode: true,
      };

    default:
      return state;
  }
}

export function autoSolveActions(factors) {
  const [multiplicandStr, multiplierStr] = factors.map(String);
  const actions = [{type: NEW_PROBLEM, factors}];

  let productRowIndex = 0;
  for (
    let multiplierFocus = multiplierStr.length - 1;
    multiplierFocus > -1;
    multiplierFocus--
  ) {
    for (
      let multiplicandFocus = multiplicandStr.length - 1;
      multiplicandFocus > -1;
      multiplicandFocus--
    ) {
      const zeroes = Array.from({
        length:
          numberToPlaceValue(multiplierStr.substr(multiplierFocus)) +
          numberToPlaceValue(multiplicandStr.substr(multiplicandFocus)),
      })
        .fill('0')
        .join('');

      actions.push(
        {
          type: NEW_PRODUCT_ROW,
          multiplicandFocus,
          multiplierFocus,
          zeroes,
        },
        {
          type: INPUT_NUMBER,
          productRowIndex: productRowIndex++,
          value:
            Number(multiplierStr[multiplierFocus]) *
            Number(multiplicandStr[multiplicandFocus]),
        }
      );
    }
  }

  actions.push({type: BEGIN_ADDITION});

  return actions;
}
