// @flow
import * as React from 'react';
import {reducer} from '../state/addition';
import {animateNextLayout} from '../utils/animation';
import {reduceActions} from '../state/state-utils';

export class ActionsState extends React.Component<
  {
    actions: Object[],
    reducer: Function,
    initialActionIndex?: number,
    // TODO: How to type this so actionsState is State from $Call<Reducer>
    // Generics for class generics?
    children: ({
      actionsState: Object,
      actionIndex: number,
      prevAction: Function,
      nextAction: Function,
    }) => React.Node,
  },
  {
    actionIndex: number,
    actionsState: Object,
  }
> {
  constructor() {
    super(...arguments);
    const {actions, initialActionIndex = 0} = this.props;
    this.state = {
      actionIndex: initialActionIndex,
      actionsState: reducer(undefined, actions[0]),
    };
  }

  prevAction = () => {
    const {reducer, actions} = this.props;
    animateNextLayout();
    this.setState(state => {
      const actionIndex = state.actionIndex - 1;
      return {
        actionIndex,
        actionsState: reduceActions(reducer, actions, actionIndex),
      };
    });
  };

  nextAction = () => {
    const {reducer, actions} = this.props;
    animateNextLayout();
    this.setState(state => {
      const actionIndex = state.actionIndex + 1;
      return {
        actionIndex,
        actionsState: reduceActions(reducer, actions, actionIndex),
      };
    });
  };

  render() {
    const {actionIndex} = this.state;
    const {reducer, actions, children} = this.props;
    return children({
      actionsState: reduceActions(reducer, actions, actionIndex),
      actionIndex,
      prevAction: this.prevAction,
      nextAction: this.nextAction,
    });
  }
}
