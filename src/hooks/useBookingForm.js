import { useState } from 'react'
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { resetBookingData } from '../store/slice/bookingDataSlice';
import { setUnsynchronizedCreateBookings, setUnsynchronizedEditedBookings } from '../store/slice/bookingsSlice';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

const useBookingForm = (route) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { colors } = useTheme();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const bookingState = useSelector(state => state.bookingData)
  const { rooms: roomsData } = useSelector(state => state.rooms)

  const findRoom = (tableId) => {
    return roomsData?.find(item => item.tables.some((table) => table.id === tableId))
  }

  const onSubmitWithMode = (data) => {
    const createDataTable = data?.table ? { ...data?.table, room: { ...findRoom(data?.table?.id) } } : null

    if (!route?.params.edit) {
      dispatch(setUnsynchronizedCreateBookings(
        { ...data, internalID: uuid.v4(), unsync: true, table: createDataTable }
      ))
    }
    if (route?.params.edit) {
      dispatch(setUnsynchronizedEditedBookings(
        { ...data, internalID: data?.internalID ? data?.internalID : uuid.v4(), unsync: true, table: createDataTable }
      ))
    }
    navigation.navigate('list')
    dispatch(resetBookingData())
  }

  const onCancelPressHandler = () => {
    dispatch(resetBookingData())
    navigation.navigate('list')
  }

  return {
    colors,
    bookingState,
    isDatePickerOpen,
    findRoom,
    onSubmitWithMode,
    setIsDatePickerOpen,
    onCancelPressHandler,
  }
}

export default useBookingForm

