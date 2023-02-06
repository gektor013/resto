import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setSelectedDate,
  setIsNeedUpdate,
} from '../store/slice/controlSlice';

const useBookingControl = () => {
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
  return {
    isDatePickerOpen,
    onChange,
    onDatePickerHandler,
  }
}

export default useBookingControl

