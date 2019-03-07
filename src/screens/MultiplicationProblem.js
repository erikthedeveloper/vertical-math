import * as React from 'react';
import {MultiplicationEquation} from '../components/MultiplicationEquation/MultiplicationEquation';
import {reducer} from './MultiplicationProblem.state';
import {actions} from './MultiplicationProblem.temp-actions';
import {ProblemScreen} from '../components/ProblemScreen';

export default class MultiplicationProblem extends React.Component {
  static navigationOptions = {
    header: null,
  };

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
    running: false,
    equationState: undefined,
  };

  runActions = async () => {
    this.setState({actionIndex: 0, running: true});
    for (const action of actions) {
      const delay = Math.random() * 250 + 750;
      await new Promise(resolve => setTimeout(resolve, delay));
      this.nextAction();
    }
    this.setState({running: false});
  };

  prevAction = () => {
    this.setState(({actionIndex}) => ({actionIndex: actionIndex - 1}));
  };

  nextAction = () => {
    this.setState(({actionIndex}) => ({actionIndex: actionIndex + 1}));
  };

  render() {
    const {actionIndex, running, equationState} = this.state;

    return (
      <ProblemScreen
        onPressPrev={actionIndex >= 1 ? this.prevAction : null}
        onPressRefresh={this.runActions}
        onPressNext={actionIndex <= actions.length - 1 ? this.nextAction : null}
        disableNavIcons={running}
      >
        <MultiplicationEquation {...equationState} />
      </ProblemScreen>
    );
  }
}
