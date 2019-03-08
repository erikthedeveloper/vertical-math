import React, {Component} from 'react';
import {VerticalNumbers} from '../components/VerticalNumbers';
import {NumberRow} from '../components/MultiplicationEquation/NumberRow';
import {ProblemScreen} from '../components/ProblemScreen';

const initialState = {
  addends: [17, 214, 123],
  addendsFocusXedni: null,
  sumInput: '',
  sumRows: [],
};

const stateSteps = [
  state => state,
  state => ({...state, addendsFocusXedni: 0, sumRows: ['']}),
  state => ({...state, sumRows: [14]}),
  state => ({...state, addendsFocusXedni: 1, sumRows: [14, '0']}),
  state => ({...state, sumRows: [14, 40]}),
  state => ({...state, addendsFocusXedni: 2, sumRows: [14, 40, '00']}),
  state => ({...state, sumRows: [14, 40, 300]}),
  state => ({...state, addendsFocusXedni: null, sumInput: 354}),
  state => ({...state, sumRows: []}),
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

    const {addends, addendsFocusXedni, sumInput, sumRows} = equationState;
    const sumActual = addends.reduce((sum, addend) => sum + addend);
    const sumIsCorrect = Number(sumInput) === sumActual;

    return (
      <ProblemScreen
        onPressPrev={actionIndex >= 1 ? this.prevAction : null}
        onPressNext={
          actionIndex < stateSteps.length - 1 ? this.nextAction : null
        }
      >
        <VerticalNumbers operator="addition">
          {addends.map((value, i) => {
            const numDigits = String(value).length;
            let focusedIndex;
            if (
              Number.isInteger(addendsFocusXedni) &&
              addendsFocusXedni < numDigits
            ) {
              focusedIndex = numDigits - 1 - addendsFocusXedni;
            }
            return (
              <NumberRow
                key={i}
                value={value}
                focusedIndexes={[focusedIndex]}
              />
            );
          })}
        </VerticalNumbers>
        <VerticalNumbers operator="addition">
          {sumRows.map((value, i) => (
            <NumberRow
              key={i}
              value={value}
              faded={i !== addendsFocusXedni}
              focusedIndexes={
                i === addendsFocusXedni && Number(value) === 0
                  ? [-1]
                  : undefined
              }
            />
          ))}
        </VerticalNumbers>
        {typeof sumInput === 'number' && (
          <NumberRow value={sumInput} success={sumIsCorrect} />
        )}
      </ProblemScreen>
    );
  }
}
