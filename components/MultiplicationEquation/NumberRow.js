import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'expo';

const FONT_SIZE = 60;
const textColor = 'gray';

function Operator({operator, style}) {
  const icon = {
    multiplication: 'ios-close',
    addition: 'ios-add',
  }[operator];
  return (
    <Icon.Ionicons
      name={icon}
      size={FONT_SIZE}
      color={textColor}
      style={[styles.operator, style]}
    />
  );
}

function NumberRowNumber({value, isOutlined}) {
  return (
    <View
      style={[
        styles.characterOuter,
        isOutlined ? styles.characterOuterFocused : null,
      ]}
    >
      <Text style={[styles.character, isOutlined && styles.characterFocused]}>
        {value}
      </Text>
    </View>
  );
}

export function NumberRow({value, focusedIndex, operator}) {
  const valueStr = String(value);

  return (
    <View style={styles.outer}>
      {operator && <Operator operator={operator} />}
      {focusedIndex === -1 && <NumberRowNumber value=" " isOutlined />}
      {valueStr.split('').map((character, i) => (
        <NumberRowNumber
          key={i}
          isOutlined={i === focusedIndex}
          value={character}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  characterOuter: {
    flexBasis: FONT_SIZE * 0.8,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  characterOuterFocused: {
    borderWidth: 1,
    borderColor: textColor,
  },
  character: {
    fontSize: FONT_SIZE,
    color: textColor,
    marginHorizontal: 5,
  },
  characterFocused: {},
  operator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
