import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedDate,
  setIsNeedUpdate,
} from '../../store/slice/controlSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../../utils/dates';
import moment from 'moment';

const BookingsControl = ({
  isConnected,
  setCurrentStepModal,
  createButtonEnabled,
  setDateModal,
  onBookingCreateHandler,
  onHandleOpenModals,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { date: dateString } = useSelector(state => state.control);
  console.log(new Date(dateString), 'STATE');
  // const { isLoading, isUpdateAvailable } = useSelector(state => state.control);
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

  return (
    <>
      <View>
        <View style={styles.row}>
          <Button
            icon="calendar"
            mode="contained"
            disabled={!isConnected}
            onPress={() => onDatePickerHandler(true)}>
            {formatDate(new Date(dateString))}
          </Button>
          {/* {!isLoading && isUpdateAvailable ? (
            <Button
              icon="update"
              mode="contained"
              onPress={onUpdateHandler}
              disabled={!isConnected}>
              Press to get new updates
            </Button>
          ) : null} */}
          {isDatePickerOpen && (
            <DateTimePicker
              // minimumDate={new Date(new Date().toString())}
              // value={new Date(new Date().toString())}
              value={new Date(dateString)}
              mode="date"
              onChange={onChange}
            />
          )}

          {/* {createButtonEnabled ? ( */}
          <Button
            icon="plus"
            mode="contained"
            onPress={() => onHandleOpenModals('date')}>
            New booking
          </Button>
          {/* ) : null} */}

          {/* <Button icon="plus" mode="contained" onPress={onBookingCreateHandler}>
            TEST
          </Button> */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  error_button: {
    backgroundColor: 'red',
    color: 'white',
  },
});

export default BookingsControl;
