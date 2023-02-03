import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Host} from 'react-native-portalize';
const Layout = ({children}) => {
  return (
    <Host>
      <View style={styles.container}>{children}</View>
    </Host>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    padding: 22,
  },
});
