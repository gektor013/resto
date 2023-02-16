import { ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper';
import UserForm from '../../components/user-form/index';

const UserFormScreen = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'New user',
      headerBackTitle: '',
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.onBackground,
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
      <UserForm />
    </ScrollView>
  );
}

export default UserFormScreen

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingHorizontal: '5%'
  },
})