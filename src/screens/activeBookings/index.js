import React, { useEffect } from 'react'
import moment from 'moment';
import { Button, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import ModaLayout from '../../layout/modal-layout';
import BookingTable from '../../components/booking-table.js';
import TimeModal from '../../components/booking-modals/time';
import BookingsControl from '../../components/bookings-control';
import NameGuest from '../../components/booking-modals/nameGuest';
import NumberGuset from '../../components/booking-modals/numberGuest';

import { setBookingData } from '../../store/slice/bookingDataSlice';
import useBookingsData from '../../hooks/useBookingsData';
import { logout } from '../../store/slice/authenticationSlice';
import DaysCalendar from '../../components/calendar';
import useModalsControl from '../../hooks/useModalsControl';
import { createUnicId } from '../../utils/helpers';



const ActiveBookingsScreen = ({ navigation }) => {
  const { isConnected } = useNetInfo();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { bookingData } = useBookingsData()
  const { modalsState, onHandleOpenModals, cancelModal } = useModalsControl()
  const { dateModal, timeModal, numberGuestModal, nameGuestModal } = modalsState;
  const bookingState = useSelector(state => state.bookingData)

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'All bookings',
      headerBackTitle: '',
      headerRight: () => (
        <Button
          mode="contained"
          onPress={() => dispatch(logout())}>
          logout
        </Button>
      ),
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTitleStyle: {
        color: colors.onBackground,
      },
    });
  }, [navigation]);

  return (
    <>
      <SafeAreaView>
        <View style={{ ...styles.container, backgroundColor: colors.background }}
        >
          <BookingsControl
            isConnected={isConnected}
            onHandleOpenModals={onHandleOpenModals}
          />
          <BookingTable
            bookingsData={bookingData}
            cancel={false}
          />
        </View>
      </SafeAreaView>

      <DaysCalendar
        isVisible={dateModal}
        onDismiss={() => cancelModal('date')}
        onSave={(e) => {
          dispatch(setBookingData({ id: 'date', data: moment(new Date(e)).format('DD MMM YYYY') }))
          cancelModal('date', false)
          onHandleOpenModals('time');
        }}
        currentDate={moment(new Date()).format('DD MMM YYYY')}
        minDate={moment(new Date()).format('DD MMM YYYY')}
      />
      <ModaLayout
        visible={timeModal}
        containerStyle={styles.timeModalContainer}
        onCancel={() => cancelModal('time')}
        title={'Time'}
        onSave={() => {
          cancelModal('time', false)
          onHandleOpenModals('guest');
        }}
        disabled={(bookingState.startTime?.length < 5)}
      >
        <TimeModal />
      </ModaLayout>

      <ModaLayout
        visible={numberGuestModal}
        onCancel={() => cancelModal('guest')}
        title={'Number of guest'}
        onSave={() => {
          cancelModal('guest', false)
          onHandleOpenModals('name');
        }}
      >
        <NumberGuset />
      </ModaLayout>

      <ModaLayout
        visible={nameGuestModal}
        onCancel={() => cancelModal('name')}
        disabled={bookingState.name === ''}
        title={'Enter name'}
        onSave={() => {
          cancelModal('name', false)
          dispatch(setBookingData({ id: 'isNewBooking', data: true }))
          dispatch(setBookingData({ id: 'internalID', data: createUnicId() }))

        }}
      >
        <NameGuest />
      </ModaLayout>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timeModalContainer: {
    maxWidth: '50%',
    marginLeft: '25%'
  },
});

export default ActiveBookingsScreen
