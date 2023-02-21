import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { Calendar } from 'react-native-calendars';
import { Button, Modal, Portal, useTheme } from 'react-native-paper';

const DaysCalendar = ({ isVisible, onDismiss, currentDate, markedDays, onSave, minDate }) => {
  const [selectedDays, setSelectedDays] = useState(currentDate);
  const { colors } = useTheme();


  // console.log(currentDate);
  const dayPress = useCallback((day) => {
    setSelectedDays(day.dateString);
  }, []);

  const marked = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const previousDays = {};
    const result = {}

    const firstDayThisMonth = new Date();
    firstDayThisMonth.setDate(1);
    const indexFirstDayOnThisMonth = firstDayThisMonth.getDay() - 1 // Set the date to the first day of the current month


    for (let i = indexFirstDayOnThisMonth; i < today.getDate() + indexFirstDayOnThisMonth; i++) {
      const previousDay = new Date(today.getFullYear(), currentMonth, i);
      const dateString = previousDay.toISOString().slice(0, 10);
      previousDays[dateString] = {
        customStyles: {
          container: {
            backgroundColor: '#dbd6d6de',
          },
          text: {
            color: '#a8a3a3de',
          }
        }
      }
    };


    markedDays?.length && markedDays?.forEach(date => {
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
      ...previousDays, ...result, [selectedDays]: {
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
  }, [selectedDays, markedDays]);

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
          markedDates={markedDays?.length ? marked
            : {
              [selectedDays]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: '#312d81',
                selectedTextColor: colors.onBackground
              }
            }
          }
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
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default DaysCalendar;