import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, SegmentedButtons, Surface, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { useGetAllRoomsQuery } from '../../store/api/roomsApi';
import { useNetInfo } from '@react-native-community/netinfo';
import LoadingScreen from '../loading';
import { useSelector } from 'react-redux';

const TableGroup = () => {
  const [value, setValue] = useState(1);
  const [lastPressed, setLastPressed] = useState(0);
  const { isConnected } = useNetInfo();
  const navigation = useNavigation()
  const route = useRoute()
  const { colors } = useTheme();

  const { isLoading: roomsDataLoading } = useGetAllRoomsQuery('', {
    skip: isConnected === false,
    refetchOnReconnect: true,
  })
  const { rooms: roomsData } = useSelector(state => state.rooms)

  const oneRoom = roomsData?.find(arr => arr.id === value)

  const handleDoublePress = useCallback((item) => {
    if (isConnected === false) return

    const time = new Date().getTime();
    const delta = time - lastPressed;
    setLastPressed(time);
    const DOUBLE_PRESS_DELAY = 400;
    if (lastPressed) {
      if (delta < DOUBLE_PRESS_DELAY) {
        navigation.navigate('roomForm', item)
      }
    }
  }, [lastPressed, isConnected]);

  const handleSelectTable = (table) => {
    if (!route?.params?.edit) return
    navigation.navigate('form', { table: { ...table, room: { id: value } } })
  }

  useEffect(() => {
    const routeSelectTable = route?.params?.selectTable

    if (routeSelectTable !== null) {
      setValue(routeSelectTable?.room?.id)
    }
  }, [route])

  return (
    <>
      {roomsDataLoading ? (<LoadingScreen />) : (
        <>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={
              roomsData ? roomsData?.map(item => ({
                value: item.id,
                label: item.name,
                onPress: () => handleDoublePress(item),
              })) : []
            }
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
            {
              oneRoom?.tables.map((item, idx) => {
                return (
                  <TouchableOpacity key={item.createdAt + idx}
                    onPress={() => handleSelectTable(item)}
                    onLongPress={() => navigation.navigate('tableForm', { ...item, room: oneRoom })}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Surface style={{ ...styles.surface, backgroundColor: route?.params?.selectTable?.id === item.id ? colors.primary : '#3fab1a' }} elevation={4}>
                        <Text>{item.name}</Text>
                      </Surface>
                      <Text>{item.seatQuantity} seats</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
            {isConnected ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('tableForm')}>
                <Surface style={{ ...styles.surface, backgroundColor: colors.primary }} elevation={4}>
                  <Text>+</Text>
                </Surface>
              </TouchableOpacity>
            ) : ''}
          </View>
        </>)}
    </>
  )
}

const TableScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { isConnected } = useNetInfo();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Button
            icon="plus"
            style={{ marginRight: 10 }}
            mode="contained"
            disabled={isConnected === false}
            onPress={() => navigation.navigate('roomForm')}>
            New room
          </Button>
          {/* <Button
            icon="plus"
            mode="contained"
            disabled={isConnected === false}
            onPress={() => navigation.navigate('tableForm')}>
            New table
          </Button> */}
        </>
      ),
    });
  }, [navigation, isConnected]);

  return (
    <SafeAreaView>
      <View
        style={{ ...styles.container, backgroundColor: colors.background }}
      >
        {/* {isConnected ? <TableGroup /> : null} */}
        <TableGroup />
      </View>
    </SafeAreaView>
  )
}

export default TableScreen

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 10,
    // paddingHorizontal: '10%',
  },

  surface: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3fab1a',
    borderRadius: 10
  },
})