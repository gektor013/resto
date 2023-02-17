import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Dialog, Portal, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';


const ModaLayout = ({ children, visible, onCancel, onSave, title, addBtn = false, addCallBack }) => {
  const state = useSelector(state => state.bookingData)
  const [disabled, setDisabled] = useState(true)

  const isDisabled = () => {
    if (title === 'Time') {
      if (state?.startTime?.length === 5 && state?.endTime?.length === 5) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
    if (title === 'Number of guest') {
      setDisabled(false)
    }
    if (title === 'Enter name') {
      if (state.name !== '') {
        setDisabled(false)
      }
    }

    if (title === 'Select employee') {
      setDisabled(false)
    }
  }

  useEffect(() => {
    isDisabled()
  }, [title, state])

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <View style={styles.titleContainer}>
          <Dialog.Title>{title}</Dialog.Title>
          {
            addBtn &&
            <Button
              mode="contained"
              icon={'plus'}
              onPress={addCallBack}
              style={styles.btn}
            >
              Emploee
            </Button>
          }
        </View>
        <Dialog.Content>
          {children}
        </Dialog.Content>
        <Dialog.Actions>
          <>
            <View style={styles.btnContainer}>
              <Button
                style={styles.mr10}
                mode="contained"
                onPress={onCancel}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={onSave}
                disabled={disabled}
              // disabled={errors?.startTime || errors?.endTime}
              >
                Save
              </Button>
            </View>
          </>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default ModaLayout

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    minWidth: '100%',
    justifyContent: 'flex-end',
  },
  mr10: {
    marginRight: 10
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    justifyContent: 'space-between'
  },
  btn: {
    justifyContent: 'center',
    height: 40
  }
})