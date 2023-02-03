import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../../assets/colors';

const ButtonShadow = ({
  title,
  containerStyle,
  titleColor,
  onPress,
  disabled,
}) => {
  return (
    <View style={{...containerStyle}}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        disabled={disabled}>
        <Text
          style={{
            ...styles.title,
            color: disabled
              ? colors.deep_gray
              : titleColor
              ? titleColor
              : colors.black,
          }}>
          {title ? title : 'Button'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonShadow;

const styles = StyleSheet.create({
  container: {
    minWidth: 148,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,

    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 32,
    shadowColor: colors.main_gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  title: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
});
