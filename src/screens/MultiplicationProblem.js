import * as React from 'react';
import {MultiplicationEquation} from '../components/MultiplicationEquation/MultiplicationEquation';
import {reducer} from '../state/multiplication';
import {autoSolveActions} from '../state/multiplication';
import {ProblemScreen} from '../components/ProblemScreen';
import {animateNextLayout} from '../utils/animation';
import {Alert} from 'react-native';
import {reduceActions} from '../state/state-utils';
import {randDelay} from '../utils/promise';
import {NEW_PROBLEM} from '../state/addition';
import {sortDesc} from '../utils/math-utils';

export default class MultiplicationProblem extends React.Component {
  constructor() {
    super(...arguments);

    const actions = autoSolveActions([97, 17]);
    const actionIndex = 0;
    const equationState = reduceActions(reducer, actions, actionIndex);

    this.state = {
      actions,
      actionIndex,
      equationState,
    };
  }

  componentDidUpdate(_, prevState) {
    const {actionIndex, actions} = this.state;
    if (
      actionIndex !== prevState.actionIndex &&
      actionIndex === actions.length - 1
    ) {
      // Alert.alert('Correct!', '💯 You solved the equation! 💯');
    }
  }

  prevAction = () => {
    animateNextLayout();
    this.setState(state => {
      const actionIndex = state.actionIndex - 1;
      return {
        actionIndex,
        equationState: reduceActions(reducer, state.actions, actionIndex),
      };
    });
  };

  nextAction = () => {
    animateNextLayout();
    this.setState(state => {
      const actionIndex = state.actionIndex + 1;
      return {
        actionIndex,
        equationState: reducer(state.equationState, state.actions[actionIndex]),
      };
    });
  };

  shuffleProducts = async () => {
    this.setState({actionIndex: 0});

    for (let i = 0; i < 5; i++) {
      await randDelay(100, 250);
      animateNextLayout();
      this.setState(state => ({
        equationState: reducer(state.equationState, {
          type: NEW_PROBLEM,
          factors: [Math.random() * 100, Math.random() * 100]
            .map(Math.round)
            .sort(sortDesc),
        }),
      }));
    }

    this.setState(state => ({
      actions: autoSolveActions(state.equationState.factors),
    }));
  };

  render() {
    const {actions, actionIndex, equationState} = this.state;

    return (
      <ProblemScreen
        onPressPrev={actionIndex >= 1 ? this.prevAction : null}
        onPressRefresh={this.shuffleProducts}
        onPressNext={actionIndex <= actions.length - 1 ? this.nextAction : null}
      >
        <MultiplicationEquation {...equationState} />
      </ProblemScreen>
    );
  }
}
