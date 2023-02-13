import { ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper';
import TableForm from '../../components/table-form';

const TableFormScreen = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'New table',
      headerBackTitle: '',
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTitleStyle: {
        color: colors.onBackground,
      },
    });
  }, [navigation]);
  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}>
      <TableForm />
    </ScrollView>
  );
}

export default TableFormScreen

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingHorizontal: '5%'
  },
})