import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrashBookingScreen from '../../screens/cancelBookings';
import FormScreen from '../../screens/bookingForm';

const Stack = createNativeStackNavigator();

const TrashBookingStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={({ navigation }) => ({
            title: 'Canceled',
          })}
          name="list"
          component={TrashBookingScreen}
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

export default TrashBookingStack;
