import { StyleSheet, Text, View, } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from '../loading';
import BookingTable from '../../components/booking-table.js';
import useCancelBookingsData from '../../hooks/useCancelBookingsData';

const DeletedBookingsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { deletedData, deletedIsFetch } = useCancelBookingsData()

  // console.log(navigation.isFocused());
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Deleted bookings',
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
        {deletedIsFetch ? <LoadingScreen /> : <BookingTable bookingsData={deletedData} cancel={true} />}
      </View>
    </SafeAreaView>
  )
}

export default DeletedBookingsScreen

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 10,
    // paddingHorizontal: '10%',
  },
})