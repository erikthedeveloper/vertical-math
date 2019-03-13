import {LayoutAnimation, Platform, UIManager} from 'react-native';

export function enableAndroidAnimation() {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export function animateNextLayout() {
  LayoutAnimation.configureNext({
    ...LayoutAnimation.Presets.linear,
    duration: 100,
  });
}
