import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../../assets/colors';

const ButtonText = ({title, containerStyle, titleColor, onPress, disabled}) => {
  return (
    <View style={{...containerStyle}}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        disabled={disabled}>
        <Text
          style={{
            ...styles.title,
            color: titleColor ? titleColor : colors.primary,
          }}>
          {title ? title : 'Button'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonText;

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
  },
});
