import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { Calendar } from 'react-native-calendars';
import { Button, Modal, Portal, useTheme } from 'react-native-paper';

const DaysCalendar = ({ isVisible, onDismiss, currentDate, markedDays, onSave, minDate }) => {
  const [selectedDays, setSelectedDays] = useState(currentDate);
  const { colors } = useTheme();

  const dayPress = useCallback((day) => {
    setSelectedDays(day.dateString);
  }, []);

  const marked = useMemo(() => {
    const result = {}

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
      ...result, [selectedDays]: {
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
      [moment(new Date()).format('YYYY-MM-DD')]: {
        selected: true,
        selectedColor: 'green',
        selectedTextColor: 'white'
      }
    }
  }, [selectedDays, markedDays]);

  const handleDismiss = () => {
    onDismiss()
    setSelectedDays(currentDate)
  }

  console.log(currentDate, 'selectedDays');
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismiss}
        style={{ paddingHorizontal: '5%', paddingVertical: '5%' }} >
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
            onPress={() => onSave(selectedDays)}
          >
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default DaysCalendar;