import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentDate } from '../constants';
import {
  setSelectedDate,
  setIsNeedUpdate,
} from '../store/slice/controlSlice';

const useBookingControl = () => {
  const { isConnected } = useNetInfo();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const dispatch = useDispatch();

  const onUpdateHandler = () => {
    dispatch(setIsNeedUpdate(true));
  };

  const onDatePickerHandler = flag => {
    setIsDatePickerOpen(flag);
  };

  const onChange = (_, selectedDate) => {
    const selectedDateString = selectedDate.toString();
    setIsDatePickerOpen(false);
    dispatch(setSelectedDate(selectedDateString));
  };

  // hwen disconnect set today date
  useEffect(() => {
    if (isConnected === false) {
      dispatch(setSelectedDate(currentDate));
    }
  }, [isConnected])

  return {
    isDatePickerOpen,
    onChange,
    onDatePickerHandler,
  }
}

export default useBookingControl

