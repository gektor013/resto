import { useEffect } from 'react'
import { formatDateParams } from '../utils/dates'
import { clearAllEditBookings, setAllEditedBookings, setOtherDayAllBookings, setTodaysAllBookings } from '../store/slice/bookingsSlice';
import { useCreateBookingMutation, useEditBookingMutation, useGetAllBookingByParamsQuery } from '../store/api/bookingsApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';

const useBookingsData = () => {
  const dispatch = useDispatch()
  const { isConnected } = useNetInfo();
  const status = 'status[]=0&status[]=2&status[]=3&status[]=4'
  const { date: dateString } = useSelector(state => state.control)
  const formatDate = formatDateParams(new Date(dateString))

  const { allBooking: todayAllBookings } = useSelector(state => state.bookings.todays)
  const { allOtherDayBooking } = useSelector(state => state.bookings.other)
  const { allEditedBookings } = useSelector(state => state.bookings.other)

  const { data: getBookingsData, isFetching: bookingFetch } = useGetAllBookingByParamsQuery({ status, date: formatDate }, {
    skip: !isConnected,
  })

  const [createBooking] = useCreateBookingMutation()
  const [editBookings] = useEditBookingMutation('', { skip: !isConnected })

  // edit bookings
  const onEditBookings = () => {
    Array.from(allEditedBookings, (elem) => {
      editBookings(elem).unwrap()
        .then(res => {
          if (res) {
            dispatch(clearAllEditBookings([]))
          }
        })
        .catch(e => console.log(e, 'onEditBookings error'))
    })
  }

  // send when there is internet
  const sendAllOtherDayBookings = async () => {
    await createBooking(allOtherDayBooking).unwrap()
      .then(res => {
        if (res) {
          dispatch(setOtherDayAllBookings([]))
        }
      }).catch(e => console.log(e, 'sendAllOtherDayBookings'))
  }

  useEffect(() => {
    if (allEditedBookings?.length && isConnected) {
      onEditBookings()
    }
  }, [allEditedBookings])

  useEffect(() => {
    if (allOtherDayBooking !== [] && isConnected) {
      sendAllOtherDayBookings()
    }
  }, [allOtherDayBooking, isConnected])

  useEffect(() => {
    if (getBookingsData?.length) {
      dispatch(setTodaysAllBookings(getBookingsData))
    } else {
      dispatch(setTodaysAllBookings([]))
    }
  }, [getBookingsData])

  return {
    todayAllBookings, bookingFetch
  }
}

export default useBookingsData;