import { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { resetBookingData, } from '../store/slice/bookingDataSlice';
import { setUnsynchronizedCreateBookings, setUnsynchronizedEditedBookings } from '../store/slice/bookingsSlice';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

const useBookingForm = (route) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { colors } = useTheme();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const bookingState = useSelector(state => state.bookingData)
  const { isConnected } = useNetInfo();

  const onSubmitWithMode = (data) => {
    if (!route?.params) {
      dispatch(setUnsynchronizedCreateBookings({ ...data, internalID: uuid.v4(), unsync: true }))
    }
    if (route?.params) {
      dispatch(setUnsynchronizedEditedBookings(
        { ...data, internalID: data?.internalID ? data?.internalID : uuid.v4(), unsync: true }
      ))
    }
    navigation.navigate('list')
  }

  const onCancelPressHandler = () => {
    dispatch(resetBookingData())
    navigation.navigate('list')
  }


  return {
    colors,
    bookingState,
    isDatePickerOpen,
    onSubmitWithMode,
    setIsDatePickerOpen,
    onCancelPressHandler,
  }
}

export default useBookingForm

