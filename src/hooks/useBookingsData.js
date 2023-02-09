import { useEffect, useState } from 'react'
import { formatDateParams } from '../utils/dates'
import { clearAllEditBookings, clearUnsynchronizedCreateBookings, clearUnsynchronizedEditedBookings, setOtherDayAllBookings, setTodaysAllBookings } from '../store/slice/bookingsSlice';
import { useCreateBookingMutation, useEditBookingMutation, useGetAllBookingByParamsQuery, useGetTodayBookingByParamsQuery } from '../store/api/bookingsApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { currentDate, statusForActivePage } from '../constants';


const useBookingsData = () => {
  const [bookingData, setBookingsData] = useState([])

  const dispatch = useDispatch()
  const { isConnected } = useNetInfo();
  const { date: dateString } = useSelector(state => state.control)
  const formatDate = formatDateParams(new Date(dateString))

  const { allBooking: todayAllBookings } = useSelector(state => state.bookings.todays)
  const { created: createdUnsyncBooking, edit: editUnsyncBookings } = useSelector(state => state.bookings.unsynchronized)
  // const { allEditedBookings } = useSelector(state => state.bookings.other)

  // get only todays booking, it is necessary for the missing internet
  const { data: getTodayBookingsData } = useGetTodayBookingByParamsQuery({ statusForActivePage, date: currentDate }, {
    skip: !isConnected,
    refetchOnReconnect: true
  })

  // get all booking by date and query params
  const { data: getOtherDayBookingsData, isFetching: otherDayBookingFetch } = useGetAllBookingByParamsQuery({ statusForActivePage, date: formatDate }, {
    skip: !isConnected,
    refetchOnReconnect: true
  })

  const [createBooking] = useCreateBookingMutation('', { skip: !isConnected })
  const [editBookings] = useEditBookingMutation('', { skip: !isConnected })

  // edit bookings
  const onEditBookings = () => {
    Array.from(editUnsyncBookings, (elem) => {
      editBookings(elem).unwrap()
        .then(res => {
          if (res) {
            dispatch(clearUnsynchronizedEditedBookings())
          }
        })
        .catch(e => console.log(e, 'onEditBookings error'))
    })
  }

  // send when there is internet
  const sendUnsyncCreadetBookings = async () => {
    Array.from(createdUnsyncBooking, (booking) => {
      createBooking(booking).unwrap()
        .then(res => {
          if (res) {
            dispatch(clearUnsynchronizedCreateBookings())
          }
        })
        .catch(e => console.log('sendAllOtherDayBookings ERROR'))
    })
  }

  // send when there is internet
  useEffect(() => {
    if (editUnsyncBookings?.length && isConnected) {
      onEditBookings()
    }
  }, [editUnsyncBookings])

  // send other day when there is internet
  useEffect(() => {
    if (createdUnsyncBooking?.length && isConnected) {
      sendUnsyncCreadetBookings()
    }
  }, [createdUnsyncBooking, isConnected])

  useEffect(() => {
    if (getTodayBookingsData?.length) {
      dispatch(setTodaysAllBookings(getTodayBookingsData))
    }
    // else if (isConnected) {
    //   dispatch(setTodaysAllBookings([]))
    // }
  }, [getTodayBookingsData, isConnected])

  useEffect(() => {
    if (isConnected === true && getOtherDayBookingsData) {
      // console.log('ISIISIS');
      setBookingsData(getOtherDayBookingsData)
    } else if (isConnected === false) {
      setBookingsData(todayAllBookings)
    }
  }, [isConnected, getOtherDayBookingsData, todayAllBookings])

  // console.log(todayAllBookings, todayAllBookings?.length, 'DATA');

  // console.log(bookingData, bookingData?.length, 'DATA');
  return {
    bookingData,
    otherDayBookingFetch
  }
}

export default useBookingsData;