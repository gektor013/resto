import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrashBookingScreen from '../../screens/booking/canceled';
import FormScreen from '../../screens/booking/form';

const Stack = createNativeStackNavigator();

const TrashBookingStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={({ navigation }) => ({
            title: 'Canceled bookings',
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
