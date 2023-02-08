import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import BookingForm from '../../components/booking-form';

const BookingFormScreen = ({ route }) => {
  const { colors } = useTheme();
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
