import * as React from 'react';
import {StyleSheet, View} from 'react-native';

export function Hr() {
  return <View style={styles.hr} />;
}

const styles = StyleSheet.create({
  screenOuter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hr: {
    height: 2,
    width: 225,
    backgroundColor: '#000',
  },
});
