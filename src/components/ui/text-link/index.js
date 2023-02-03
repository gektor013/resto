import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../../../assets/colors';
import {ManropeBold} from '../../../assets/fonts';

const TextLink = ({inline, textStyle, onPress, children}) => (
  <Text
    onPress={onPress}
    style={{...styles.text, display: inline ? 'none' : 'flex', ...textStyle}}>
    {children || ''}
  </Text>
);

export default TextLink;

const styles = StyleSheet.create({
  text: {
    fontFamily: ManropeBold,
    fontSize: 13,
    color: colors.primary,
  },
});
