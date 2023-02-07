import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import BookingForm from '../../components/booking-form';

const BookingFormScreen = () => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}>
      <BookingForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
});

export default BookingFormScreen;
