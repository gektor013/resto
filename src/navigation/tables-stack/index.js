import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TableScreen from '../../screens/table';
import { useTheme } from 'react-native-paper';
import RoomFormScreen from '../../screens/roomForm';
import TableFormScreen from '../../screens/tableForm';

const Stack = createNativeStackNavigator();

const TablesStack = () => {
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
          name="tablesScreen"
          component={TableScreen}
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

export default TablesStack;
