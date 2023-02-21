import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment';
import { Button, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from '../loading';
import ModaLayout from '../../layout/modal-layout';
import BookingTable from '../../components/booking-table.js';
import TimeModal from '../../components/booking-modals/time';
import BookingsControl from '../../components/bookings-control';
import NameGuest from '../../components/booking-modals/nameGuest';
import NumberGuset from '../../components/booking-modals/numberGuest';

import { resetBookingData, setBookingData } from '../../store/slice/bookingDataSlice';
import useBookingsData from '../../hooks/useBookingsData';
import { logout } from '../../store/slice/authenticationSlice';
import DaysCalendar from '../../components/calendar';

const ActiveBookingsScreen = ({ navigation }) => {
  const { isConnected } = useNetInfo();
  const { colors } = useTheme();
  const { bookingData, otherDayBookingFetch } = useBookingsData()
  const { date: dateString } = useSelector(state => state.control)

  const [dateModal, setDateModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [numberGuestModal, setNumberGuestModal] = useState(false)
  const [nameGuestModal, setNameGuestModal] = useState(false)
  const dispatch = useDispatch()

  const onHandleOpenModals = setterType => {
    switch (setterType) {
      case 'date':
        setDateModal(true);
        break;
      case 'time':
        setTimeModal(true);
        break;
      case 'guest':
        setNumberGuestModal(true);
        break;
      case 'name':
        setNameGuestModal(true);
        break;
      default:
        return;
    }
  };

  const cancelModal = useCallback(
    setter => {
      switch (setter) {
        case 'date':
          setDateModal(false);
          break;
        case 'time':
          setTimeModal(false);
          break;
        case 'guest':
          setNumberGuestModal(false);
          break;
        case 'name':
          setNameGuestModal(false);
          break;
        default:
          return;
      }
      dispatch(resetBookingData())
    },
    [],
  );

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
          {otherDayBookingFetch ? <LoadingScreen /> : <BookingTable bookingsData={bookingData} cancel={false} />}
        </View>
      </SafeAreaView>

      <DaysCalendar
        isVisible={dateModal}
        onDismiss={() => cancelModal('date')}
        onSave={(e) => {
          dispatch(setBookingData({ id: 'date', data: moment(new Date(e)).format('DD MMM YYYY') }))
          setDateModal(false);
          onHandleOpenModals('time');
        }}
        currentDate={moment(new Date()).format('DD MMM YYYY')}
        minDate={moment(new Date()).format('DD MMM YYYY')}
      />
      <ModaLayout
        visible={timeModal}
        onCancel={() => cancelModal('time')}
        disabled={true}
        title={'Time'}
        onSave={() => {
          setTimeModal(false);
          onHandleOpenModals('guest');
        }}
      >
        <TimeModal />
      </ModaLayout>

      <ModaLayout
        visible={numberGuestModal}
        onCancel={() => cancelModal('guest')}
        disabled={true}
        title={'Number of guest'}
        onSave={() => {
          setNumberGuestModal(false);
          onHandleOpenModals('name');
        }}
      >
        <NumberGuset />
      </ModaLayout>

      <ModaLayout
        visible={nameGuestModal}
        onCancel={() => cancelModal('name')}
        disabled={true}
        title={'Enter name'}
        onSave={() => {
          setNameGuestModal(false);
          navigation.navigate('form', { edit: false });
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
    // paddingHorizontal: '10%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ActiveBookingsScreen
