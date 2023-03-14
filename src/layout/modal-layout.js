import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Dialog, Portal, Button } from 'react-native-paper';


const ModaLayout = ({ children, visible, onCancel, onSave, title, addBtn = false, addCallBack, disabled, containerStyle }) => {

  return (
    <Portal>
      <Dialog style={{ ...containerStyle }} visible={visible} onDismiss={onCancel}>
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