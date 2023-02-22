import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData } from '../../store/slice/bookingDataSlice';

const ComentAndPhone = ({ valueType }) => {
  const dispatch = useDispatch()
  const { commentByAdminForAdmin, phone } = useSelector(state => state.bookingData)
  const value = valueType === 'commentByAdminForAdmin' ? commentByAdminForAdmin : phone
  const label = valueType === 'commentByAdminForAdmin' ? 'Comment' : 'Phone'
  const keyboardType = valueType === 'commentByAdminForAdmin' ? 'default' : 'numeric'
  return (
    <View style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroupContainer}>
            <TextInput
              mode="outlined"
              label={label}
              value={value}
              keyboardType={keyboardType}
              onChangeText={value => dispatch(setBookingData({ id: valueType, data: value }))}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default ComentAndPhone

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
});