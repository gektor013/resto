import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WaitingBookingScreen from '../../screens/waitBookings';
// import FormScreen from '../../screens/booking/form';

const Stack = createNativeStackNavigator();

const WaitingsBookingStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={() => ({
            title: 'Awaiting confirmation',
          })}
          name="list"
          component={WaitingBookingScreen}
        />
        {/* <Stack.Screen
          options={() => ({
            title: 'Form',
          })}
          name="form"
          component={FormScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WaitingsBookingStack;
