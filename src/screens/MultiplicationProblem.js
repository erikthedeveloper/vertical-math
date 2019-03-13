import * as React from 'react';
import {MultiplicationEquation} from '../components/MultiplicationEquation/MultiplicationEquation';
import {reducer} from '../state/multiplication';
import {actions} from './MultiplicationProblem.temp-actions';
import {ProblemScreen} from '../components/ProblemScreen';
import {animateNextLayout} from '../utils/animation';
import {Alert} from 'react-native';

export default class MultiplicationProblem extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return {
      equationState: state.actions
        .slice(0, state.actionIndex)
        .reduce(
          (state, action) => reducer(state, action),
          reducer(undefined, {})
        ),
    };
  }

  state = {
    actions,
    actionIndex: 0,
    equationState: undefined,
  };

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
    this.setState(({actionIndex}) => ({actionIndex: actionIndex - 1}));
  };

  nextAction = () => {
    animateNextLayout();
    this.setState(({actionIndex}) => ({actionIndex: actionIndex + 1}));
  };

  render() {
    const {actions, actionIndex, equationState} = this.state;

    return (
      <ProblemScreen
        onPressPrev={actionIndex >= 1 ? this.prevAction : null}
        onPressNext={actionIndex <= actions.length - 1 ? this.nextAction : null}
      >
        <MultiplicationEquation {...equationState} />
      </ProblemScreen>
    );
  }
}
