import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors';
import {ManropeBold} from '../../../assets/fonts';

const MainTitle = ({containerStyle, textStyle, children}) => (
  <View style={{...containerStyle}}>
    <Text style={{...styles.text, ...textStyle}}>{children || ''}</Text>
  </View>
);

export default MainTitle;

const styles = StyleSheet.create({
  text: {
    fontFamily: ManropeBold,
    fontSize: 24,
    color: colors.black,
  },
});
