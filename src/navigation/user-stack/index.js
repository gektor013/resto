import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TableScreen from '../../screens/table';
import { useTheme } from 'react-native-paper';
import RoomFormScreen from '../../screens/roomForm';
import TableFormScreen from '../../screens/tableForm';
import UsersScreen from '../../screens/users/index';
import UserFormScreen from '../../screens/userForm/index';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name="list"
          component={UsersScreen}
        />

        <Stack.Screen
          name="userForm"
          component={UserFormScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
