import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'react-native-paper';
import BookingsControl from '../../components/bookings-control';
import BookingTable from '../../components/booking-table.js';

const ActiveBookingsScreen = () => {
  const { isConnected } = useNetInfo();
  const { colors } = useTheme();

  return (
    <SafeAreaView>
      <View
        style={{ ...styles.container, backgroundColor: colors.background }}
      >
        <BookingsControl
          isConnected={isConnected}
        // createButtonEnabled={createButtonEnabled}
        // onBookingCreateHandler={onBookingCreateHandler}
        // onHandleOpenModals={onHandleOpenModals}
        />
        <BookingTable />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 10,
    // paddingHorizontal: '10%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ActiveBookingsScreen
