import React, {Component} from 'react';
import {Alert} from 'react-native';
import {ProblemScreen} from '../components/ProblemScreen';
import {AdditionEquation} from '../components/AdditionEquation/AdditionEquation';
import {generateAddends, sortAsc} from '../utils/math-utils';
import {animateNextLayout} from '../utils/animation';
import {randDelay} from '../utils/promise';
import {reduceActions} from '../state/state-utils';
import {autoSolveActions, NEW_PROBLEM, reducer} from '../state/addition';

export class AdditionProblem extends Component {
  constructor() {
    super(...arguments);

    const addends = [129, 12, 318, 2732].sort(sortAsc);
    const actions = autoSolveActions(addends);
    const actionIndex = 0;
    const equationState = reduceActions(reducer, actions, actionIndex);

    this.state = {actions, actionIndex, equationState};
  }

  componentDidUpdate(_, prevState) {
    const {actionIndex, actions} = this.state;
    if (
      actionIndex !== prevState.actionIndex &&
      actionIndex === actions.length - 1
    ) {
      Alert.alert('Correct!', '💯 You solved the equation! 💯');
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

  shuffleAddends = async () => {
    this.setState({actionIndex: 0});

    for (let i = 0; i < 5; i++) {
      await randDelay(100, 250);
      animateNextLayout();
      this.setState(state => ({
        equationState: reducer(state.equationState, {
          type: NEW_PROBLEM,
          addends: generateAddends(2, 5),
        }),
      }));
    }

    this.setState(state => ({
      actions: autoSolveActions(state.equationState.addends),
    }));
  };

  render() {
    const {actions, actionIndex, equationState} = this.state;

    return (
      <ProblemScreen
        onPressPrev={actionIndex > 0 ? this.prevAction : null}
        onPressRefresh={this.shuffleAddends}
        onPressNext={actionIndex < actions.length - 1 ? this.nextAction : null}
      >
        <AdditionEquation {...equationState} />
      </ProblemScreen>
    );
  }
}
