import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import useBookingControl from '../../hooks/useBookingControl';
import { dateCS, isNeedUpdateCS, setIsNeedUpdate, setSelectedDate } from '../../store/slice/controlSlice';
import moment from 'moment';
import { formatDate } from '../../utils/dates';

import { useGetBookingsDatesQuery } from '../../store/api/bookingsApi';
import DaysCalendar from '../calendar';
import { bookingsDataCS } from '../../store/slice/bookingDataSlice';

const BookingsControl = ({
  isConnected,
  onHandleOpenModals,
}) => {
  const dateString = useSelector(dateCS)
  const isNeedUpdate = useSelector(isNeedUpdateCS)
  const { isEdit, isNewBooking } = useSelector(bookingsDataCS);

  const disbledCalendar = isEdit || isNewBooking || !isConnected

  const { isDatePickerOpen, onChange, onDatePickerHandler } = useBookingControl()
  const { data: bookingsDates } = useGetBookingsDatesQuery()
  const dispatch = useDispatch()


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

  useEffect(() => {
    if (isConnected === false) {
      dispatch(setIsNeedUpdate(true))
    }
  }, [isConnected])

  return (
    <>
      <View>
        <View style={styles.row}>
          <View style={{ flexDirection: 'row' }}>
            <Button
              icon="chevron-left"
              mode="contained"
              compact={true}
              disabled={disbledCalendar}
              style={{ marginRight: 5 }}
              onPress={() => dayPlus('minus')}>
            </Button>
            <Button
              icon="calendar"
              mode="contained"
              disabled={disbledCalendar}
              onPress={onDatePickerHandler}>
              {formatDate(new Date(dateString))}
            </Button>
            <Button
              icon="chevron-left"
              mode="contained"
              compact={true}
              disabled={disbledCalendar}
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
