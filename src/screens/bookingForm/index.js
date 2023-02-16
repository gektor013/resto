import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import BookingForm from '../../components/booking-form';

const BookingFormScreen = ({ route, navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Form',
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
      <BookingForm route={route} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingHorizontal: '5%'
  },
});

export default BookingFormScreen;
