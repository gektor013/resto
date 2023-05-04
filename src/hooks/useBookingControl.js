import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentDate } from '../constants';
import {
  dateCS,
  isNeedUpdateCS,
  setIsNeedUpdate,
  setSelectedDate,
} from '../store/slice/controlSlice';
import moment from 'moment';
import { useGetBookingsDatesQuery } from '../store/api/bookingsApi';
import { setBookingDates } from '../store/slice/bookingDatesSlice';

const useBookingControl = () => {
  const dispatch = useDispatch();
  const dateString = useSelector(dateCS)
  const isNeedUpdate = useSelector(isNeedUpdateCS)

  const { isConnected } = useNetInfo();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);


  const { data: bookingsDates } = useGetBookingsDatesQuery('', {
    skip: !isConnected || isNeedUpdate,
    refetchOnReconnect: true,
  })

  const onDatePickerHandler = flag => {
    setIsDatePickerOpen(prev => !prev);
  };

  const onChange = (selectedDate) => {
    setIsDatePickerOpen(false);
    dispatch(setSelectedDate(selectedDate));
  };

  const dayPlus = (type) => {
    const plusDay = moment(new Date(dateString).setDate(new Date(dateString).getDate() + 1)).toString()
    const minusDay = moment(new Date(dateString).setDate(new Date(dateString).getDate() - 1)).toString()

    switch (type) {
      case 'minus':
        dispatch(setSelectedDate(minusDay))
        break;

      case 'plus':
        dispatch(setSelectedDate(plusDay))
        break;
      default:
        break;
    }
  };

  // when disconnect set today date
  useEffect(() => {
    if (isConnected === false) {
      dispatch(setSelectedDate(currentDate));
    }
  }, [isConnected])


  useEffect(() => {
    if (isConnected === false) {
      dispatch(setIsNeedUpdate(true))
    }
  }, [isConnected])

  useEffect(() => {
    if(bookingsDates instanceof Array) {
      dispatch(setBookingDates(bookingsDates))
    }
  }, [bookingsDates])

  return {
    dateString,
    isNeedUpdate,
    isDatePickerOpen,
    bookingsDates,
    dayPlus,
    onChange,
    onDatePickerHandler,
  }
}

export default useBookingControl

