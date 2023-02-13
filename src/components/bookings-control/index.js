import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../../utils/dates';
import useBookingControl from '../../hooks/useBookingControl';
import { logout } from '../../store/slice/authenticationSlice';
import moment from 'moment';
import { setSelectedDate } from '../../store/slice/controlSlice';
import { useNavigation } from '@react-navigation/native';


const BookingsControl = ({
  isConnected,
  onHandleOpenModals,
}) => {
  const { date: dateString } = useSelector(state => state.control);
  const { isDatePickerOpen, onChange, onDatePickerHandler } = useBookingControl()
  const dispatch = useDispatch()
  const navigation = useNavigation()

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
            onPress={() => onDatePickerHandler(true)}>
            {formatDate(new Date(dateString))}
          </Button>
          <Button
            icon="chevron-right"
            mode="contained"
            compact={true}
            disabled={!isConnected}
            style={{ marginLeft: 5 }}
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
        {isDatePickerOpen && (
          <DateTimePicker
            // minimumDate={new Date()}
            value={date}
            mode="date"
            onChange={onChange}
          />
        )}

        <Button
          icon="plus"
          mode="contained"
          onPress={() => navigation.navigate('roomForm')}>
          New room
        </Button>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => console.log('date')}>
          New table
        </Button>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => onHandleOpenModals('date')}>
          New booking
        </Button>
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
