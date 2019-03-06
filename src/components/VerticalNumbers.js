import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from './Icon';

const styles = StyleSheet.create({
  outer: {},
  bottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 20,
  },
  hr: {
    height: 2,
    width: 225,
    backgroundColor: '#000',
  },
});

export function VerticalNumbers({children, operator}) {
  const displaySolutionBar = React.Children.count(children) > 1;
  return (
    <View style={styles.outer}>
      <View>
        {children}
        {displaySolutionBar && (
          <Operator operator={operator} style={styles.bottomLeft} />
        )}
      </View>
      {displaySolutionBar && <Hr />}
    </View>
  );
}

function Hr() {
  return <View style={styles.hr} />;
}

function Operator({operator, style}) {
  const icon = {
    multiplication: 'close',
    addition: 'add',
    subtraction: 'remove',
  }[operator];
  return (
    <Icon name={icon} size={60} color="gray" style={[styles.operator, style]} />
  );
}
