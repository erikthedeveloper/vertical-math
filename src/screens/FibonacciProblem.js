import React, {Component} from 'react';
import {autoSolveActions, reducer} from '../state/addition';
import {ActionsState} from '../components/ActionsState';
import {ProblemScreen} from '../components/ProblemScreen';
import {AdditionEquation} from '../components/AdditionEquation/AdditionEquation';

const initialAddends = [0, 1];

export class FibonacciProblem extends Component {
  state = {
    addends: initialAddends,
    steppingBack: false,
  };

  prevStep = () => {
    this.setState(({addends: [small, big]}) => ({
      addends: [big - small, small],
      steppingBack: true,
    }));
  };

  nextStep = () => {
    this.setState(({addends: [small, big]}) => ({
      addends: [big, small + big],
      steppingBack: false,
    }));
  };

  render() {
    const {addends, steppingBack} = this.state;
    const prevStep = addends[0] !== initialAddends[0] ? this.prevStep : null;

    let actions = autoSolveActions(addends);
    // Skip awkward first step
    actions = actions.slice(0, actions.length - 1);
    const FIRST_INDEX = 1;
    const LAST_INDEX = actions.length - 1;

    return (
      <ActionsState
        // Force remount / fresh state on addends change
        key={String(addends)}
        reducer={reducer}
        actions={actions}
        initialActionIndex={steppingBack ? LAST_INDEX : FIRST_INDEX}
      >
        {({actionsState, actionIndex: i, prevAction, nextAction}) => (
          <ProblemScreen
            onPressPrev={i === FIRST_INDEX ? prevStep : prevAction}
            onPressNext={i < LAST_INDEX ? nextAction : this.nextStep}
          >
            <AdditionEquation {...actionsState} />
          </ProblemScreen>
        )}
      </ActionsState>
    );
  }
}
