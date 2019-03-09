import React, {Component} from 'react';
import {VerticalNumbers} from '../components/VerticalNumbers';
import {NumberRow} from '../components/MultiplicationEquation/NumberRow';
import {ProblemScreen} from '../components/ProblemScreen';

const initialState = {
  addends: [17, 294, 1123, 1000],
  addendsFocusXedni: null,
  sumInput: '',
  sumRows: [],
};

const stateSteps = [
  state => state,
  // FOCUS_NEXT
  state => ({...state, addendsFocusXedni: 0}),
  // INPUT_SUM
  state => ({...state, sumInput: 14}),
  // FOCUS_NEXT -> split carry off when appropriate
  state => ({...state, addendsFocusXedni: 1, carryRow: 10, sumInput: 4}),
  // INPUT_SUM
  state => ({...state, sumInput: 134}),
  // FOCUS_NEXT -> split carry off when appropriate
  state => ({...state, addendsFocusXedni: 2, carryRow: 110, sumInput: 34}),
  // INPUT_SUM
  state => ({...state, sumInput: 434}),
  // FOCUS_NEXT
  state => ({...state, addendsFocusXedni: 3}),
  // INPUT_SUM
  state => ({...state, sumInput: 2434}),
  // COMPLETE
  state => ({...state, addendsFocusXedni: null}),
];

export class AdditionProblem extends Component {
  state = {
    actionIndex: 0,
    equationState: undefined,
  };

  static getDerivedStateFromProps(props, state) {
    return {
      equationState: stateSteps
        .slice(0, state.actionIndex + 1)
        .reduce((state, mergeState) => mergeState(state), initialState),
    };
  }

  prevAction = () => {
    this.setState(({actionIndex}) => ({actionIndex: actionIndex - 1}));
  };

  nextAction = () => {
    this.setState(({actionIndex}) => ({actionIndex: actionIndex + 1}));
  };

  render() {
    const {actionIndex, equationState} = this.state;

    const {addends, addendsFocusXedni, sumInput, carryRow} = equationState;
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
      <ProblemScreen
        onPressPrev={actionIndex >= 1 ? this.prevAction : null}
        onPressNext={
          actionIndex < stateSteps.length - 1 ? this.nextAction : null
        }
      >
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
      </ProblemScreen>
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
