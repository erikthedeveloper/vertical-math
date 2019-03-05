import * as React from 'react';
import {Platform} from 'react-native';
import {Icon as ExpoIcon} from 'expo';

const {Ionicons} = ExpoIcon;

export function Icon({name, ...otherProps}) {
  const prefix = Platform.select({ios: 'ios-', android: 'md-'});
  return <Ionicons name={prefix + name} color="gray" {...otherProps} />;
}
