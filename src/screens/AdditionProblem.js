import React, {Component} from 'react';
import {ProblemScreen} from '../components/ProblemScreen';
import {AdditionEquation} from '../components/AdditionEquation/AdditionEquation';

const initialState = {
  addends: [17, 294, 1123, 1000],
  focusedPlaceValue: null,
  sumInput: '',
  sumRows: [],
};

// TODO: Refactor to actions and reducer handlers and not hardcoded values...
const stateSteps = [
  state => state,
  // FOCUS_NEXT
  state => ({...state, focusedPlaceValue: 0}),
  // INPUT_SUM
  state => ({...state, sumInput: 14}),
  // FOCUS_NEXT -> split carry off when appropriate
  state => ({...state, focusedPlaceValue: 1, carryRow: 10, sumInput: 4}),
  // INPUT_SUM
  state => ({...state, sumInput: 134}),
  // FOCUS_NEXT -> split carry off when appropriate
  state => ({...state, focusedPlaceValue: 2, carryRow: 110, sumInput: 34}),
  // INPUT_SUM
  state => ({...state, sumInput: 434}),
  // FOCUS_NEXT
  state => ({...state, focusedPlaceValue: 3}),
  // INPUT_SUM
  state => ({...state, sumInput: 2434}),
  // COMPLETE
  state => ({...state, focusedPlaceValue: null}),
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

    return (
      <ProblemScreen
        onPressPrev={actionIndex >= 1 ? this.prevAction : null}
        onPressNext={
          actionIndex < stateSteps.length - 1 ? this.nextAction : null
        }
      >
        <AdditionEquation {...equationState} />
      </ProblemScreen>
    );
  }
}
