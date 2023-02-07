import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'react-native-paper';
import BookingsControl from '../../components/bookings-control';
import BookingTable from '../../components/booking-table.js';
import { useGetAllBookingByParamsQuery } from '../../store/api/bookingsApi';
import { useSelector, useDispatch } from 'react-redux';
import { formatDateParams } from '../../utils/dates'
import LoadingScreen from '../loading';
import { setTodaysAllBookings } from '../../store/slice/bookingsSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimeModal from '../../components/booking-modals/time';
import { resetBookingData, setBookingData } from '../../store/slice/bookingDataSlice';
import moment from 'moment';
import ModaLayout from '../../layout/modal-layout';
import NumberGuset from '../../components/booking-modals/numberGuest';
import NameGuest from '../../components/booking-modals/nameGuest';

const useBookingsData = () => {
  const dispatch = useDispatch()
  const status = 'status[]=0&status[]=2&status[]=3&status[]=4'
  const { date: dateString } = useSelector(state => state.control)
  const formatDate = formatDateParams(new Date(dateString))
  const { data: bookingsData, isFetching: bookingFetch } = useGetAllBookingByParamsQuery({ status, date: formatDate })
  const { allBooking } = useSelector(state => state.bookings.todays)

  useEffect(() => {
    if (bookingsData?.length) {
      dispatch(setTodaysAllBookings(bookingsData))
    }
  }, [bookingsData])

  return {
    bookingsData, bookingFetch
  }
}

const ActiveBookingsScreen = ({ navigation }) => {
  const { isConnected } = useNetInfo();
  const { colors } = useTheme();
  const { bookingsData, bookingFetch } = useBookingsData()
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

  return (
    <>
      <SafeAreaView>
        <View
          style={{ ...styles.container, backgroundColor: colors.background }}
        >
          <BookingsControl
            isConnected={isConnected}
            // createButtonEnabled={createButtonEnabled}
            // onBookingCreateHandler={onBookingCreateHandler}
            onHandleOpenModals={onHandleOpenModals}
          />
          {bookingFetch ? <LoadingScreen /> : <BookingTable bookingsData={bookingsData} />}
        </View>
      </SafeAreaView>

      {dateModal && (
        <DateTimePicker
          id='date'
          minimumDate={new Date()}
          value={new Date(dateString)}
          mode="date"
          onChange={(e, selectedDate) => {
            if (e.type === 'dismissed') {
              return cancelModal('date');
            }
            dispatch(setBookingData({ id: 'date', data: moment(selectedDate).format('DD MMM YYYY') }))
            setDateModal(false);
            onHandleOpenModals('time');
          }}
        />
      )}
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
          navigation.navigate('form');
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
