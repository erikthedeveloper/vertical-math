import {LayoutAnimation} from 'react-native';

// function enableAndroidAnimation() {
//   if (Platform.OS === 'android') {
//     UIManager.setLayoutAnimationEnabledExperimental &&
//       UIManager.setLayoutAnimationEnabledExperimental(true);
//   }
// }

export function animateNextLayout() {
  LayoutAnimation.configureNext({
    ...LayoutAnimation.Presets.linear,
    duration: 100,
  });
}
