import {createReducer} from './createReducer';
import {numberToPlaceValue, sumArrayAtPlaceValue} from '../utils/math-utils';

export const NEW_PROBLEM = 'NEW_PROBLEM';
const FOCUS_NEXT = 'FOCUS_NEXT';
const AUTO_INPUT_NEXT = 'AUTO_INPUT_NEXT';
const COMPLETED = 'COMPLETED';

export const autoSolveActions = addends => [
  {type: NEW_PROBLEM, addends},
  ...Array.from({
    length: Math.max(...addends.map(String).map(str => str.length)),
  }).reduce(acc => [...acc, {type: FOCUS_NEXT}, {type: AUTO_INPUT_NEXT}], []),
  {type: COMPLETED},
];

const initialState = {
  addends: [],
  focusedPlaceValue: null,
  sumInput: '',
  carryRow: '',
};

export const reducer = createReducer(initialState, {
  [FOCUS_NEXT]: state => {
    if (state.focusedPlaceValue === null) {
      return {...state, focusedPlaceValue: 0};
    }

    const {sumInput, carryRow, focusedPlaceValue} = state;
    // Split carry off when appropriate, May begin with "0"
    const nextSumInput = String(sumInput).substr(
      numberToPlaceValue(sumInput) - focusedPlaceValue
    );
    return {
      ...state,
      focusedPlaceValue: focusedPlaceValue + 1,
      carryRow: sumInput - nextSumInput + Number(carryRow),
      sumInput: nextSumInput,
    };
  },
  [AUTO_INPUT_NEXT]: state => ({
    ...state,
    // May begin with "0"
    sumInput: [
      sumArrayAtPlaceValue(
        [state.carryRow, ...state.addends],
        state.focusedPlaceValue
      ),
      state.sumInput,
    ].join(''),
  }),
  [NEW_PROBLEM]: (state, action) => ({
    ...initialState,
    addends: action.addends,
  }),
  [COMPLETED]: state => ({...state, focusedPlaceValue: null}),
});
