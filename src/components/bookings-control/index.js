import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../../utils/dates';
import useBookingControl from '../../hooks/useBookingControl';
import { logout } from '../../store/slice/authenticationSlice';

const BookingsControl = ({
  isConnected,
  onHandleOpenModals,
}) => {
  const { date: dateString } = useSelector(state => state.control);
  const { isDatePickerOpen, onChange, onDatePickerHandler } = useBookingControl()
  // const { isLoading, isUpdateAvailable } = useSelector(state => state.control);
  const dispatch = useDispatch()
  return (
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
            // minimumDate={new Date()}
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
        <Button
          icon="plus"
          mode="contained"
          onPress={() => dispatch(logout())}>
          logout
        </Button>
        {/* ) : null} */}

        {/* <Button icon="plus" mode="contained" onPress={onBookingCreateHandler}>
            TEST
          </Button> */}
      </View>
    </View>
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
