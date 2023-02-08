import { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { resetBookingData, } from '../store/slice/bookingDataSlice';
import { setAllEditedBookings, setOtherDayAllBookings, setUnsynchronizedBookings } from '../store/slice/bookingsSlice';
import { useNavigation } from '@react-navigation/native';

const useBookingForm = (route) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { colors } = useTheme();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const bookingState = useSelector(state => state.bookingData)
  const { isConnected } = useNetInfo();

  const onSubmitWithMode = (data) => {
    if (isConnected && !route?.params) {
      dispatch(setOtherDayAllBookings(data))
    }

    if (isConnected && route?.params) {
      dispatch(setAllEditedBookings(data))
    }
    // else {
    //   dispatch(setUnsynchronizedBookings(data))
    // }
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

