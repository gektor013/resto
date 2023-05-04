import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import useBookingControl from '../../hooks/useBookingControl';
import { setIsNeedUpdate } from '../../store/slice/controlSlice';
import { formatDate } from '../../utils/dates';

import DaysCalendar from '../calendar';
import { bookingsDataCS } from '../../store/slice/bookingDataSlice';

const BookingsControl = ({
  isConnected,
  onHandleOpenModals,
}) => {
  const { isEdit, isNewBooking } = useSelector(bookingsDataCS);
  const { isNeedUpdate, dateString, bookingsDates, isDatePickerOpen, onChange, onDatePickerHandler, dayPlus } = useBookingControl()
  const dispatch = useDispatch()

  return (
    <>
      <View>
        <View style={styles.row}>
          <View style={{ flexDirection: 'row' }}>
            <Button
              icon="chevron-left"
              mode="contained"
              compact={true}
              style={{ marginRight: 5 }}
              onPress={() => dayPlus('minus')}>
            </Button>
            <Button
              icon="calendar"
              mode="contained"
              onPress={onDatePickerHandler}>
              {formatDate(new Date(dateString))}
            </Button>
            <Button
              icon="chevron-left"
              mode="contained"
              compact={true}
              style={{ marginLeft: 5, transform: [{ rotateY: '180deg' }] }}
              onPress={() => dayPlus('plus')}>
            </Button>
          </View>
          {isConnected && isNeedUpdate ? (
            <Button
              icon="update"
              mode="contained"
              disabled={!isConnected}
              onPress={() => dispatch(setIsNeedUpdate(false))}
            >
              Press to get new updates
            </Button>
          ) : null}

          <Button
            icon="plus"
            mode="contained"
            disabled={isEdit || isNewBooking}
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
        mainCalendar={true}
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
