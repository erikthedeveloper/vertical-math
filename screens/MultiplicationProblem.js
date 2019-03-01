import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {MultiplicationEquation} from '../components/MultiplicationEquation/MultiplicationEquation';

export default class MultiplicationProblem extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.screenOuter}>
        <MultiplicationEquation factors={[24, 36]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenOuter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
