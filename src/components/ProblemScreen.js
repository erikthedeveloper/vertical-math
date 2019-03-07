import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from './Icon';

export function ProblemScreen({
  children,
  onPressPrev,
  onPressRefresh,
  onPressNext,
  disableNavIcons,
}) {
  return (
    <View style={styles.screenOuter}>
      <View>{children}</View>
      {onPressPrev && (
        <TouchIcon
          name="arrow-back"
          onPress={onPressPrev}
          style={styles.bottomLeft}
          disabled={disableNavIcons}
        />
      )}
      {onPressRefresh && (
        <TouchIcon
          name="refresh"
          onPress={onPressRefresh}
          style={styles.bottomCenter}
          disabled={disableNavIcons}
        />
      )}
      {onPressNext && (
        <TouchIcon
          name="arrow-forward"
          onPress={onPressNext}
          style={styles.bottomRight}
          disabled={disableNavIcons}
        />
      )}
    </View>
  );
}

function TouchIcon({name, style, disabled, onPress, ...otherProps}) {
  return (
    <TouchableOpacity
      {...otherProps}
      onPress={disabled ? null : onPress}
      style={[style, {padding: 10}, disabled && {opacity: 0.6}]}
    >
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
