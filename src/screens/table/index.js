import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, SegmentedButtons, Surface, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { useGetAllRoomsQuery } from '../../store/api/roomsApi';
import { useNetInfo } from '@react-native-community/netinfo';
import LoadingScreen from '../loading';
import { useSelector, useDispatch } from 'react-redux';
import { setBookingData } from '../../store/slice/bookingDataSlice';

const TableGroup = () => {
  const [value, setValue] = useState(1);
  const [lastPressed, setLastPressed] = useState(0);
  const { isConnected } = useNetInfo();
  const navigation = useNavigation()
  const dispatch = useDispatch()
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
    if (!route?.params?.editTable) return
    dispatch(setBookingData({ id: 'table', data: { ...table, room: { id: value } } }))
    navigation.goBack()
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
          {/* <ScrollView style={{ flex: 1, backgroundColor: 'red' }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}> */}
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            style={{ alignItems: 'center', marginBottom: 0 }}
            buttons={
              roomsData ? roomsData?.map(item => ({
                value: item.id,
                label: item.name,
                onPress: () => handleDoublePress(item),
              })) : []
            }
          />
          {/* </ScrollView> */}
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
                        <Text style={{ color: colors.onBackground }}>{item.name}</Text>
                      </Surface>
                      <Text style={{ color: colors.onBackground }}>{item.seatQuantity} seats</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
            {isConnected ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('tableForm', { room: oneRoom })}>
                <Surface style={{ ...styles.surface, backgroundColor: colors.primary }} elevation={4}>
                  <Text>+</Text>
                </Surface>
              </TouchableOpacity>
            ) : ''}
          </View>
        </>)
      }
    </>
  )
}

const TableScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { isConnected } = useNetInfo();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon="plus"
          style={{ marginRight: 10 }}
          mode="contained"
          disabled={isConnected === false}
          onPress={() => navigation.navigate('roomForm')}>
          New room
        </Button>
      ),
      headerTintColor: colors.onBackground,
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