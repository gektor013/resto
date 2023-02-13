import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveBookingScreen from '../../screens/activeBookings';
import FormScreen from '../../screens/bookingForm';
import RoomFormScreen from '../../screens/roomForm';
import TableFormScreen from '../../screens/tableForm';

const Stack = createNativeStackNavigator();

const ActiveBookingStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={({ navigation }) => ({
            title: 'All bookings',
          })}
          name="list"
          component={ActiveBookingScreen}
        />
        <Stack.Screen
          options={() => ({
            title: 'Form',
          })}
          name="form"
          component={FormScreen}
        />
        <Stack.Screen
          options={() => ({
            title: 'New room',
          })}
          name="roomForm"
          component={RoomFormScreen}
        />
        <Stack.Screen
          options={() => ({
            title: 'New table',
          })}
          name="tableForm"
          component={TableFormScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ActiveBookingStack;
