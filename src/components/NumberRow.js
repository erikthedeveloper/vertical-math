import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const FONT_SIZE = 50;
const textColor = 'gray';

function NumberRowNumber({value, isOutlined, success, isCarry}) {
  return (
    <View
      style={[
        styles.characterOuter,
        isOutlined ? styles.characterOuterFocused : null,
      ]}
    >
      <Text
        style={[
          styles.character,
          isOutlined && styles.characterFocused,
          success ? {color: 'green'} : null,
          isCarry && styles.carryNumber,
          isCarry && Number(value) === 0 && styles.faded,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

export function NumberRow({
  value,
  focusedIndexes,
  operator,
  // TODO: Refactor to successIndexes
  success,
  // TODO: Refactor to fadedIndexes
  faded,
  isCarry,
}) {
  const valueStr = String(value);

  return (
    <View style={[styles.outer, faded && styles.faded]}>
      {focusedIndexes
        .filter(i => i < 0)
        .map(i => (
          <NumberRowNumber key={i} value=" " isCarry={isCarry} isOutlined />
        ))}
      {valueStr.split('').map((character, i) => (
        <NumberRowNumber
          key={valueStr.length - 1 - i}
          isOutlined={focusedIndexes.includes(i)}
          success={success}
          value={character}
          isCarry={isCarry}
        />
      ))}
    </View>
  );
}

NumberRow.defaultProps = {
  focusedIndexes: [],
};

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  faded: {
    opacity: 0.6,
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
  carryNumber: {
    fontSize: FONT_SIZE / 2,
  },
  characterFocused: {},
});
