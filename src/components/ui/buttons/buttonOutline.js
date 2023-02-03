import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../../assets/colors';

const ButtonOutline = ({
  title,
  containerStyle,
  containerColor,
  titleColor,
  onPress,
  disabled,
}) => {
  return (
    <View style={{...containerStyle}}>
      <TouchableOpacity
        style={{
          ...styles.container,
          borderColor: disabled
            ? colors.deep_gray
            : containerColor
            ? containerColor
            : colors.primary,
        }}
        onPress={onPress}
        disabled={disabled}>
        <Text
          style={{
            ...styles.title,
            color: disabled
              ? colors.deep_gray
              : titleColor
              ? titleColor
              : colors.primary,
          }}>
          {title ? title : 'Button'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonOutline;

const styles = StyleSheet.create({
  container: {
    minWidth: 144,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 32,
  },
  title: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
  },
});
