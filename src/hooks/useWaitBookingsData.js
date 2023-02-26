import { useEffect, useState } from 'react'
import { useNetInfo } from '@react-native-community/netinfo';
import { statusForWaitPage } from '../constants';
import { useGetAllBookingByParamsQuery } from '../store/api/bookingsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherDayWaitBookings } from '../store/slice/bookingsSlice';


const useWaitBookingsData = () => {
  const [waitData, setWaitData] = useState([])
  const { isConnected } = useNetInfo();
  const dispatch = useDispatch()

  const { allOtherDayWaitingBooking } = useSelector(state => state.bookings.other)

  const { data: waitPageData, isFetching: waitIsFetch } = useGetAllBookingByParamsQuery('?status=0', {
    skip: !isConnected,
    refetchOnFocus: true,
    pollingInterval: 3000000,
    refetchOnMountOrArgChange: true
  })
  // console.log(statusForWaitPage, 'statusForWaitPage');

  useEffect(() => {
    if (waitPageData && !waitIsFetch) {
      dispatch(setOtherDayWaitBookings(waitPageData))
    }
  }, [waitPageData])

  useEffect(() => {
    if (allOtherDayWaitingBooking) {
      setWaitData(allOtherDayWaitingBooking)
    }
  }, [allOtherDayWaitingBooking])

  return {
    waitData, waitIsFetch
  }
}

export default useWaitBookingsData

