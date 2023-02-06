import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme, Button } from 'react-native-paper';
import BookingsControl from '../../components/bookings-control';
import BookingTable from '../../components/booking-table.js';
import { useGetAllBookingByParamsQuery } from '../../store/api/bookingsApi';
import { useSelector, useDispatch } from 'react-redux';
import { formatDateParams } from '../../utils/dates'
import LoadingScreen from '../loading';
import { setTodaysAllBookings } from '../../store/slice/bookingsSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimeModal from '../../components/booking-modals/time';

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

const initialStateBookingsForm = {
  date: new Date(),
  startTime: '',
  endTime: '',
  prefixName: 0,
  name: '',
  email: null,
  phone: '',
  numberOfGuestsAdult: '',
  numberOfGuestsChild: '',
  numberOfGuestsBaby: '',
  status: 0,
  commentByGuest: '',
  commentByAdminForGuest: '',
  commentByAdminForAdmin: '',
};


const ActiveBookingsScreen = () => {
  const { isConnected } = useNetInfo();
  const { colors } = useTheme();
  // const { bookingsData, bookingFetch } = useBookingsData()
  const { date: dateString } = useSelector(state => state.control)

  const [bookingState, setBookingState] = useState(initialStateBookingsForm)
  const [dateModal, setDateModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);

  const onHandleOpenModals = setterType => {
    switch (setterType) {
      case 'date':
        setDateModal(true);
        break;
      case 'time':
        setTimeModal(true);
        break;
      // case 'guest':
      //   setNumberGuestModal(true);
      //   break;
      // case 'name':
      //   setNameGuestModal(true);
      //   break;
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
      setBookingState(initialStateBookingsForm);
    },
    [],
  );
  console.log('RENDER');

  // console.log(bookingState);
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
          {/* {bookingFetch ? <LoadingScreen /> : <BookingTable bookingsData={bookingsData} />} */}
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
            setBookingState(prev => ({ ...prev, date: selectedDate }));
            setDateModal(false);
            onHandleOpenModals('time');
          }}
        />
      )}
      <TimeModal
        visible={timeModal}
        setVisible={cancelModal}
        bookingState={bookingState}
        setBookingState={setBookingState} />
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
