import { useState } from 'react'
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { resetBookingData, bookingsDataCS } from '../store/slice/bookingDataSlice';
import { setUnsynchronizedCreateBookings, setUnsynchronizedEditedBookings } from '../store/slice/bookingsSlice';
import { useNavigation } from '@react-navigation/native';
import { createUnicId } from '../utils/helpers';
import { allRoomsDataCS } from '../store/slice/roomsSlice';

const useBookingForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { colors } = useTheme();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const bookingState = useSelector(bookingsDataCS)
  const roomsData = useSelector(allRoomsDataCS)

  const findRoom = (tableId) => {
    return roomsData?.find(item => item.tables.some((table) => table.id === tableId))
  }

  const onSubmitWithMode = () => {
    const createDataTable = bookingState?.table ? { ...bookingState?.table, room: { ...findRoom(bookingState?.table?.id) } } : null
    const internalID = bookingState?.internalID ? bookingState?.internalID : createUnicId()

    if (bookingState.isEdit) {
      dispatch(setUnsynchronizedEditedBookings(
        { ...bookingState, internalID, unsync: true, table: createDataTable }
      ))
    } else {
      dispatch(setUnsynchronizedCreateBookings(
        { ...bookingState, internalID, unsync: true, table: createDataTable }
      ))
    }
    navigation.navigate('allBokings')
    dispatch(resetBookingData())
  }

  return {
    colors,
    bookingState,
    isDatePickerOpen,
    findRoom,
    onSubmitWithMode,
    setIsDatePickerOpen,
  }
}

export default useBookingForm

