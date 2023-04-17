import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { Calendar } from 'react-native-calendars';
import { Button, Modal, Portal, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { bookingDatesCS } from '../../store/slice/bookingDatesSlice';

const DaysCalendar = ({ isVisible, onDismiss, currentDate, onSave, minDate, mainCalendar }) => {
  const [selectedDays, setSelectedDays] = useState(currentDate);
  const bookingDates = useSelector(bookingDatesCS)
  const { colors } = useTheme();

  const dayPress = useCallback((day) => {
    setSelectedDays(day.dateString);
  }, []);

  const today = moment(new Date()).format('YYYY-MM-DD')

  const marked = useMemo(() => {
    const previousDays = {};
    const result = {}

    const firstDayThisMonth = new Date();
    firstDayThisMonth.setDate(1);

    let currentDate = new Date();
    let i = 1;

    while (moment(currentDate).format('YYYY-MM-DD') <= today) {
      previousDays[moment(currentDate).format('YYYY-MM-DD')] = {
        customStyles: {
          container: {
            backgroundColor: '#dbd6d6de',
          },
          text: {
            color: '#a8a3a3de',
          },
        },
      };

      currentDate.setDate(i);
      i++;
    }

    bookingDates?.length && bookingDates?.forEach(date => {
      result, result[date] = {
        customStyles: {
          container: {
            backgroundColor: '#ffeb3b',
          },
          text: {
            color: 'black',
          }
        }
      }
    })

    return {
      ...result, ...previousDays, [selectedDays]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#312d81',
        selectedTextColor: 'white'
      },

      [selectedDays]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#312d81',
        selectedTextColor: 'white'
      },
      [moment(today).format('YYYY-MM-DD')]: {
        selected: true,
        selectedColor: 'green',
        selectedTextColor: 'white'
      },
    }
  }, [selectedDays, bookingDates]);

  const handleDismiss = () => {
    onDismiss()
    setSelectedDays(currentDate)
  }

  const onHandleSave = () => {
    onSave(selectedDays)
    setSelectedDays(currentDate)
  }

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={handleDismiss}
        style={{ paddingHorizontal: '25%', paddingVertical: '5%' }} >
        <Calendar
          markingType={'custom'}
          enableSwipeMonths
          minDate={minDate}
          current={currentDate}
          onDayPress={dayPress}
          markedDates={mainCalendar && marked}
          firstDay={1}

          theme={{
            todayBackgroundColor: 'green',
            todayTextColor: colors.onBackground,
            arrowColor: colors.onPrimaryContainer,
            dayTextColor: 'black',

          }}
          style={{
            borderWidth: 1,
            borderRadius: 7,
            borderColor: 'gray',
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }} >

          <Button
            mode="contained"
            style={{ marginRight: 5 }}
            onPress={handleDismiss}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={onHandleSave}
          >
            Ok
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default DaysCalendar;