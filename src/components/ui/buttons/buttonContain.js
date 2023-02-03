import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../../assets/colors';

const ButtonContain = ({
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
          backgroundColor: disabled
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
            color: titleColor ? titleColor : colors.white,
          }}>
          {title ? title : 'Button'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonContain;

const styles = StyleSheet.create({
  container: {
    minWidth: 148,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 32,
  },
  title: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
  },
});
