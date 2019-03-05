import React from 'react';
import {View} from 'react-native';
import {styles} from '../components/layout';
import {VerticalNumbers} from '../components/VerticalNumbers';
import {NumberRow} from '../components/MultiplicationEquation/NumberRow';

export const SubtractionProblem = () => (
  <View style={styles.screenOuter}>
    <View>
      <VerticalNumbers operator="subtraction">
        {[12, 10].map((value, i) => (
          <NumberRow key={i} value={value} />
        ))}
      </VerticalNumbers>
      <NumberRow value={12 - 10} success />
    </View>
  </View>
);
