import { StyleSheet, View, } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingTable from '../../components/booking-table.js';
import useWaitBookingsData from '../../hooks/useWaitBookingsData';

const WaitBookingsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { waitData } = useWaitBookingsData()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Wait for approve',
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
    <SafeAreaView>
      <View
        style={{ ...styles.container, backgroundColor: colors.background }}
      >
        <BookingTable bookingsData={waitData} cancel={false} />
      </View>
    </SafeAreaView>
  )
}

export default WaitBookingsScreen

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 10,
  },
})