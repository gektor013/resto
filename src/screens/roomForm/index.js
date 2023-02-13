import { ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper';
import RoomForm from '../../components/room-form';
import { SafeAreaView } from 'react-native-safe-area-context';

const RoomFormScreen = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'New room',
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
      <RoomForm />
    </ScrollView>
  );
}

export default RoomFormScreen

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingHorizontal: '5%'
  },
})