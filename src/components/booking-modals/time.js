import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData } from '../../store/slice/bookingDataSlice';
import MaskInput from 'react-native-mask-input';
import { useRef, useEffect } from 'react';

const TimeModal = () => {
  const { startTime, endTime } = useSelector(state => state.bookingData)
  const dispatch = useDispatch()

  const startTimeRef = useRef(null);
  const endTimeref = useRef(null);


  useEffect(() => {
    const timeOut = setTimeout(() => {
      startTimeRef.current.focus();
    }, 200);

    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    if (startTime.length === 5) {
      endTimeref.current.focus();
    }
  }, [startTime]);

  return (
    <View style={{
      flexDirection: 'row',
      minWidth: '100%',
      marginBottom: 20,
    }}>
      <View style={{ flex: 1, marginRight: 10 }}>
        <TextInput
          ref={startTimeRef}
          mode="outlined"
          label="Start time"
          value={startTime}
          keyboardType={'numeric'}
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
          ref={endTimeref}
          mode="outlined"
          label="End time"
          value={endTime}
          keyboardType={'numeric'}
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