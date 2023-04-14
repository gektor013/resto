import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { setBookingData } from '../../store/slice/bookingDataSlice';
import { useEffect } from 'react';

const NameGuest = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch()
  const ref = useRef()

  const [nameError, setNameError] = useState(false)
  const { prefixName, name } = useSelector(state => state.bookingData)

  const handleChangeStatus = (status) => {
    return dispatch(setBookingData({ id: 'prefixName', data: status }))
  }
  const onBlur = () => {
    if (name?.length) {
      setNameError(false)
    } else {
      setNameError(true)
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      ref.current.focus();
    }, 200);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <View style={styles.modal}>
      <View style={styles.prefixNameBtnContainer}>
        <>
          <Button
            mode="elevated"
            buttonColor={classNames({
              [colors.primary]: prefixName === 0,
            })}
            textColor={colors.secondaryContainer}
            style={styles.mr10}
            onPress={() => handleChangeStatus(0)}
          >
            Herr
          </Button>

          <Button
            mode="elevated"
            buttonColor={classNames({
              [colors.primary]: prefixName === 1,
            })}
            style={styles.mr10}
            textColor={colors.secondaryContainer}
            onPress={() => handleChangeStatus(1)}
          >
            Frau
          </Button>

          <Button
            mode="elevated"
            buttonColor={classNames({
              [colors.primary]: prefixName === 2,
            })}
            textColor={colors.secondaryContainer}
            onPress={() => handleChangeStatus(2)}
          >
            Firma
          </Button>
        </>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroupContainer}>
            <TextInput
              ref={ref}
              mode="outlined"
              label="Guest name"
              value={name}
              onBlur={onBlur}
              onChangeText={value => dispatch(setBookingData({ id: 'name', data: value }))}
              error={nameError}
            />
            {nameError && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: colors.error }}>
                  field name cannot be empty
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

export default NameGuest

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  prefixNameBtnContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  mr10: {
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    minWidth: '100%',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  inputGroupContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  btnContainer: {
    flexDirection: 'row',
    minWidth: '100%',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});