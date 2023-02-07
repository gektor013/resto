import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveBookingScreen from '../../screens/activeBookings';
import FormScreen from '../../screens/bookingForm';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ActiveBookingStack;
