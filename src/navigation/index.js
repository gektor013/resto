import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveBookingsScreen from '../screens/activeBookings';
import WaitBookingsScreen from '../screens/waitBookings';
import CancelBookingsScreen from '../screens/cancelBookings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ActiveBookingStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="active"
          component={ActiveBookingsScreen}
        />
        <Tab.Screen
          name="wait"
          component={WaitBookingsScreen}
        />
        <Tab.Screen
          name="cancel"
          component={CancelBookingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ActiveBookingStack;
