import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native'
import { TextInput, useTheme, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData } from '../../store/slice/bookingDataSlice';

const NumberGuset = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch()
  const ref = useRef()
  const { numberOfGuestsAdult, numberOfGuestsChild, numberOfGuestsBaby } = useSelector(state => state.bookingData)

  const handleChangeNumberGuest = (guest, quantity, action) => {
    if (action === 'plus') {
      return dispatch(setBookingData({ id: guest, data: quantity + 1 }))
    } else {
      return dispatch(setBookingData({ id: guest, data: quantity - 1 }))
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      ref.current.focus();
    }, 200);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <>
            <IconButton
              icon="minus"
              size={30}
              disabled={numberOfGuestsAdult === '' || numberOfGuestsAdult === 0}
              onPress={() => handleChangeNumberGuest('numberOfGuestsAdult', numberOfGuestsAdult, 'minus')}
            />
            <TextInput
              ref={ref}
              mode="outlined"
              label="Adult"
              keyboardType="number-pad"
              style={{ flex: 1 }}
              selectionColor={colors.black}
              underlineColor={colors.black}
              activeUnderlineColor={colors.black}
              value={numberOfGuestsAdult.toString()}
              onChangeText={value => dispatch(setBookingData({ id: 'numberOfGuestsAdult', data: Math.floor(value) }))
              }
            />
            <IconButton
              icon="plus"
              size={30}
              onPress={() => handleChangeNumberGuest('numberOfGuestsAdult', numberOfGuestsAdult, 'plus')}
            />
          </>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <>
            <IconButton
              icon="minus"
              disabled={numberOfGuestsChild === '' || numberOfGuestsChild === 0}
              size={30}
              onPress={() => handleChangeNumberGuest('numberOfGuestsChild', numberOfGuestsChild, 'minus')}
            />
            <TextInput
              mode="outlined"
              label="Child"
              keyboardType="number-pad"
              style={{ flex: 1 }}
              value={numberOfGuestsChild.toString()}
              onChangeText={value => dispatch(setBookingData({ id: 'numberOfGuestsChild', data: Math.floor(value) }))}
            />
            <IconButton
              icon="plus"
              size={30}
              onPress={() => handleChangeNumberGuest('numberOfGuestsChild', numberOfGuestsChild, 'plus')}
            />
          </>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <>
            <IconButton
              icon="minus"
              size={30}
              disabled={numberOfGuestsBaby === '' || numberOfGuestsBaby === 0}
              onPress={() => handleChangeNumberGuest('numberOfGuestsBaby', numberOfGuestsBaby, 'minus')}
            />
            <TextInput
              mode="outlined"
              label="Baby"
              keyboardType="number-pad"
              style={{ flex: 1 }}
              value={numberOfGuestsBaby.toString()}
              onChangeText={value => dispatch(setBookingData({ id: 'numberOfGuestsBaby', data: Math.floor(value) }))}
            />
            <IconButton
              icon="plus"
              size={30}
              onPress={() => handleChangeNumberGuest('numberOfGuestsBaby', numberOfGuestsBaby, 'plus')}
            />
          </>
        </View>
      </View>
    </View>
  )
}

export default NumberGuset

const styles = StyleSheet.create({
  container: {
    // maxWidth: '60%',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    minWidth: '100%',
    marginBottom: 3,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})