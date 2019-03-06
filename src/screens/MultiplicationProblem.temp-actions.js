import {
  ACCEPT_SOLUTION,
  INPUT_NUMBER,
  INPUT_SOLUTION,
  NEW_PRODUCT_ROW,
} from './MultiplicationProblem.state';

export const actions = [
  {type: NEW_PRODUCT_ROW, multiplicandFocus: 1, multiplierFocus: 1, zeroes: ''},
  {type: INPUT_NUMBER, productRowIndex: 0, value: 24},
  {
    type: NEW_PRODUCT_ROW,
    multiplicandFocus: 0,
    multiplierFocus: 1,
    zeroes: '0',
  },
  {type: INPUT_NUMBER, productRowIndex: 1, value: 12},
  {
    type: NEW_PRODUCT_ROW,
    multiplicandFocus: 1,
    multiplierFocus: 0,
    zeroes: '0',
  },
  {type: INPUT_NUMBER, productRowIndex: 2, value: 12},
  {
    type: NEW_PRODUCT_ROW,
    multiplicandFocus: 0,
    multiplierFocus: 0,
    zeroes: '00',
  },
  {type: INPUT_NUMBER, productRowIndex: 3, value: 6},
  {type: INPUT_SOLUTION, value: 864},
  {type: ACCEPT_SOLUTION},
];
