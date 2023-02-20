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
    setIsDatePickerOpen(prev => !prev);
  };

  const onChange = (selectedDate) => {
    setIsDatePickerOpen(false);
    dispatch(setSelectedDate(selectedDate));
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

