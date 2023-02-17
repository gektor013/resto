import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveBookingScreen from '../../screens/activeBookings';
import FormScreen from '../../screens/bookingForm';
import TableScreen from '../../screens/table';
import { useTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const ActiveBookingStack = () => {
  const { colors } = useTheme();

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
            headerShown: true,
            title: 'Tables',
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleStyle: {
              color: colors.onBackground,
            },
          })}
          name="tablesScreen"
          component={TableScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ActiveBookingStack;
