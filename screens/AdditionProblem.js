import React from 'react';
import {View} from 'react-native';
import {styles} from '../components/layout';
import {VerticalNumbers} from '../components/VerticalNumbers';
import {NumberRow} from '../components/MultiplicationEquation/NumberRow';

export const AdditionProblem = () => (
  <View style={styles.screenOuter}>
    <View>
      <VerticalNumbers operator="addition">
        {[12, 120].map((value, i) => (
          <NumberRow key={i} value={value} />
        ))}
      </VerticalNumbers>
      <NumberRow value={12 + 120} success />
    </View>
  </View>
);
