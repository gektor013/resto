import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors';
import {ManropeMedium} from '../../../assets/fonts';

const Paragraph = ({containerStyle, textStyle, children}) => (
  <View style={{...containerStyle}}>
    <Text style={{...styles.text, ...textStyle}}>{children || ''}</Text>
  </View>
);

export default Paragraph;

const styles = StyleSheet.create({
  text: {
    fontFamily: ManropeMedium,
    fontSize: 13,
    lineHeight: 23.4,
    color: colors.black,
  },
});
