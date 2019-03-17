// @flow
import {createReducer} from './createReducer';
import {
  isNumber,
  numberToPlaceValue,
  sumArrayAtPlaceValue,
} from '../utils/math-utils';

export const NEW_PROBLEM = 'NEW_PROBLEM';
const FOCUS_NEXT = 'FOCUS_NEXT';
const AUTO_INPUT_NEXT = 'AUTO_INPUT_NEXT';
const COMPLETED = 'COMPLETED';

export const autoSolveActions = (addends: number[]) => [
  {type: NEW_PROBLEM, addends},
  ...Array.from({
    length: Math.max(...addends.map(String).map(str => str.length)),
  }).reduce(acc => [...acc, {type: FOCUS_NEXT}, {type: AUTO_INPUT_NEXT}], []),
  {type: COMPLETED},
];

type State = {
  addends: number[],
  focusedPlaceValue: ?number,
  sumInput: string,
  carryRow: string,
};

const initialState: State = {
  addends: [],
  focusedPlaceValue: null,
  sumInput: '',
  carryRow: '',
};

export const reducer = createReducer<State, Object>(initialState, {
  [FOCUS_NEXT]: state => {
    const {sumInput, carryRow, focusedPlaceValue} = state;

    if (!isNumber(focusedPlaceValue)) {
      return {...state, focusedPlaceValue: 0};
    }

    // Split carry off when appropriate, May begin with "0"
    const nextSumInput = String(sumInput).substr(
      numberToPlaceValue(sumInput) - focusedPlaceValue
    );
    return {
      ...state,
      focusedPlaceValue: focusedPlaceValue + 1,
      carryRow: String(
        Number(sumInput) - Number(nextSumInput) + Number(carryRow)
      ),
      sumInput: nextSumInput,
    };
  },

  [AUTO_INPUT_NEXT]: state => {
    const {focusedPlaceValue} = state;
    if (!isNumber(focusedPlaceValue)) {
      return state;
    }

    return {
      ...state,
      // May begin with "0"
      sumInput: [
        sumArrayAtPlaceValue(
          [state.carryRow, ...state.addends].map(Number),
          focusedPlaceValue
        ),
        state.sumInput,
      ].join(''),
    };
  },

  [NEW_PROBLEM]: (state, action: {addends: number[]}) => ({
    ...initialState,
    addends: action.addends,
  }),

  [COMPLETED]: state => ({...state, focusedPlaceValue: null}),
});
