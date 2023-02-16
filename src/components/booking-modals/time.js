import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData } from '../../store/slice/bookingDataSlice';
import MaskInput from 'react-native-mask-input';

const TimeModal = ({ }) => {
  const { startTime, endTime } = useSelector(state => state.bookingData)
  const dispatch = useDispatch()


  return (
    <View style={{
      flexDirection: 'row',
      minWidth: '100%',
      marginBottom: 20,
    }}>
      <View style={{ flex: 1, marginRight: 10 }}>
        <TextInput
          mode="outlined"
          label="Start time"
          value={startTime}
          onChangeText={e => dispatch(setBookingData({ id: 'startTime', data: e }))}
          render={props => (
            <MaskInput
              {...props}
              mask={[/\d/, /\d/, ':', /\d/, /\d/]}
            />
          )}
        />
      </View>

      <View style={{ flex: 1, marginRight: 10 }}>
        <TextInput
          mode="outlined"
          label="End time"
          value={endTime}
          onChangeText={e => dispatch(setBookingData({ id: 'endTime', data: e }))}
          render={props => (
            <MaskInput
              {...props}
              mask={[/\d/, /\d/, ':', /\d/, /\d/]}
            />
          )}
        />
      </View>
    </View>
  )
}

export default TimeModal