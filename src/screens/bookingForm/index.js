import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import BookingForm from '../../components/booking-form';

const BookingFormScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}>
      <BookingForm navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
});

export default BookingFormScreen;
