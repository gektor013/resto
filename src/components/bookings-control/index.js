import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import useBookingControl from '../../hooks/useBookingControl';
import { setSelectedDate } from '../../store/slice/controlSlice';
import moment from 'moment';
import { formatDate } from '../../utils/dates';

import { useGetBookingsDatesQuery } from '../../store/api/bookingsApi';
import DaysCalendar from '../calendar';

const BookingsControl = ({
  isConnected,
  onHandleOpenModals,
}) => {
  const { date: dateString } = useSelector(state => state.control);
  const { isDatePickerOpen, onChange, onDatePickerHandler } = useBookingControl()
  const dispatch = useDispatch()

  const { data: bookingsDates } = useGetBookingsDatesQuery()

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

  return (
    <>
      <View>
        <View style={styles.row}>
          <View style={{ flexDirection: 'row' }}>
            <Button
              icon="chevron-left"
              mode="contained"
              compact={true}
              disabled={!isConnected}
              style={{ marginRight: 5 }}
              onPress={() => dayPlus('minus')}>
            </Button>
            <Button
              icon="calendar"
              mode="contained"
              disabled={!isConnected}
              onPress={onDatePickerHandler}>
              {formatDate(new Date(dateString))}
            </Button>
            <Button
              icon="chevron-left"
              mode="contained"
              compact={true}
              disabled={!isConnected}
              style={{ marginLeft: 5, transform: [{ rotateY: '180deg' }] }}
              onPress={() => dayPlus('plus')}>
            </Button>
          </View>
          {/* {!isLoading && isUpdateAvailable ? (
            <Button
              icon="update"
              mode="contained"
              onPress={onUpdateHandler}
              disabled={!isConnected}>
              Press to get new updates
            </Button>
          ) : null} */}
          {/* {isDatePickerOpen && (
          <DateTimePicker
            minimumDate={new Date()}
            value={new Date()}
            mode="date"
            onChange={onChange}
          />
        )} */}
          <Button
            icon="plus"
            mode="contained" tableForm
            onPress={() => onHandleOpenModals('date')}>
            New booking
          </Button>

        </View>
      </View>

      <DaysCalendar
        isVisible={isDatePickerOpen}
        onDismiss={onDatePickerHandler}
        onSave={onChange}
        currentDate={dateString}
        markedDays={bookingsDates}
      />
    </>
  );
};




const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10
  },
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
