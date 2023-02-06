import { View } from 'react-native';
import { Dialog, Portal, Button, TextInput } from 'react-native-paper';


const TimeModal = ({ visible, setVisible, bookingState, setBookingState }) => {
  const hideDialog = () => setVisible('time');

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>

          <>
            <View style={{
              flexDirection: 'row',
              minWidth: '100%',
              marginBottom: 20,
            }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <TextInput
                  mode="outlined"
                  label="Start time"
                  value={bookingState.startTime}
                  // style={{ color: 'red', }}
                  // onBlur={onBlur}
                  onChangeText={e => setBookingState(prev => ({ ...prev, startTime: e }))}
                // error={errors?.startTime && true}
                // render={props => (
                //   <MaskInput
                //     {...props}
                //     mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                //   />
                // )}
                />
                {/* {errors?.startTime && (
                  <View style={styles.mt5}>
                    <Text style={{ color: colors.error }}>
                      {errors?.startTime}
                    </Text>
                  </View>
                )} */}
              </View>

              <View style={{ flex: 1, marginRight: 10 }}>
                <TextInput
                  mode="outlined"
                  label="End time"
                  // style={styles.mv5p}
                  // selectionColor={colors.white}
                  // underlineColor={colors.white}
                  // activeUnderlineColor={colors.white}
                  value={bookingState.endTime}
                  // onBlur={onBlur}
                  onChangeText={e => setBookingState(prev => ({ ...prev, endTime: e }))}
                // error={errors?.endTime && true}
                // render={props => (
                //   <MaskInput
                //     {...props}
                //     mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                //   />
                // )}
                />

                {/* {errors?.endTime && (
                  <View style={styles.mt5}>
                    <Text style={{ color: colors.error }}>
                      {errors?.endTime}
                    </Text>
                  </View>
                )} */}
              </View>
            </View>
          </>
        </Dialog.Content>
        <Dialog.Actions>
          <>
            <View style={{
              flexDirection: 'row',
              minWidth: '100%',
              justifyContent: 'flex-end',
            }}>
              <Button
                style={{ marginRight: 10 }}
                mode="contained"
                onPress={() => setVisible('time')}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
              // onPress={() => onHandleOpenModals('guest')}
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

export default TimeModal