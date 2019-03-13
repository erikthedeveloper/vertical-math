import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Icon} from './Icon';

const styles = StyleSheet.create({
  outer: {},
  hr: {
    height: 2,
    width: 225,
    backgroundColor: '#000',
  },
  operator: {
    position: 'absolute',
    bottom: Platform.select({
      ios: 0,
      android: 10,
    }),
    fontSize: Platform.select({
      ios: 60,
      android: 50,
    }),
    left: 20,
  },
});

export function VerticalNumbers({children, operator}) {
  const displaySolutionBar = React.Children.count(children) > 1;
  return (
    <View style={styles.outer}>
      <View>
        {children}
        {displaySolutionBar && (
          <Operator operator={operator} style={styles.operator} />
        )}
      </View>
      {displaySolutionBar && <Hr />}
    </View>
  );
}

function Hr() {
  return <View style={styles.hr} />;
}

function Operator({operator}) {
  const icon = {
    multiplication: 'close',
    addition: 'add',
    subtraction: 'remove',
  }[operator];
  return <Icon name={icon} color="gray" style={[styles.operator]} />;
}
