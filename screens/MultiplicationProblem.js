import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {MultiplicationEquation} from '../components/MultiplicationEquation/MultiplicationEquation';
import {Icon} from '../components/Icon';
import {reducer} from './MultiplicationProblem.state';
import {actions} from './MultiplicationProblem.temp-actions';

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
      <View style={styles.screenOuter}>
        <MultiplicationEquation {...equationState} />
        {!running && (
          <>
            {actionIndex >= 1 && (
              <TouchIcon
                name="arrow-back"
                onPress={this.prevAction}
                style={styles.bottomLeft}
              />
            )}
            <TouchIcon
              name="refresh"
              onPress={this.runActions}
              style={styles.bottomCenter}
            />
            {actionIndex <= actions.length - 1 && (
              <TouchIcon
                name="arrow-forward"
                onPress={this.nextAction}
                style={styles.bottomRight}
              />
            )}
          </>
        )}
      </View>
    );
  }
}

function TouchIcon({name, style, ...otherProps}) {
  return (
    <TouchableOpacity {...otherProps} style={[style, {padding: 10}]}>
      <Icon name={name} size={28} color="gray" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screenOuter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  bottomCenter: {
    position: 'absolute',
    bottom: 20,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
