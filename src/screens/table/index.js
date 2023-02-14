import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, SegmentedButtons, Surface, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useGetAllRoomsQuery } from '../../store/api/roomsApi';

const TableGroup = () => {
  const [value, setValue] = useState(1);
  const [lastPressed, setLastPressed] = useState(0);
  // const { rooms: roomsData } = useSelector(state => state.rooms)
  const { data: roomsData } = useGetAllRoomsQuery()
  const { colors } = useTheme();
  const navigation = useNavigation()

  const oneRoom = roomsData?.find(arr => arr.id === value)

  const handlePress = useCallback((item) => {
    const time = new Date().getTime();
    const delta = time - lastPressed;
    setLastPressed(time);
    const DOUBLE_PRESS_DELAY = 400;
    if (lastPressed) {
      if (delta < DOUBLE_PRESS_DELAY) {
        navigation.navigate('roomForm', item)
      }
    }
  }, [lastPressed]);

  return (
    <>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={
          roomsData ? roomsData?.map(item => ({
            value: item.id,
            label: item.name,
            accessibilityLabel: 'qweq',
            onPress: () => handlePress(item),
          })) : []
        }
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
        {
          oneRoom?.tables.map((item, idx) => {
            return (
              <TouchableOpacity key={item.createdAt + idx}
                onPress={() => navigation.navigate('tableForm', { ...item, room: oneRoom })}
              >
                <Surface style={{ ...styles.surface, backgroundColor: colors.primary }} elevation={4}>
                  <Text>{item.name}</Text>
                  <Text>{item.seatQuantity} seats</Text>
                </Surface>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </>
  )
}

const TableScreen = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Button
            icon="plus"
            style={{ marginRight: 10 }}
            mode="contained"
            onPress={() => navigation.navigate('roomForm')}>
            New room
          </Button>
          <Button
            icon="plus"
            mode="contained"
            onPress={() => navigation.navigate('tableForm')}>
            New table
          </Button>
        </>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <View
        style={{ ...styles.container, backgroundColor: colors.background }}
      >
        <TableGroup />
        {/* {deletedIsFetch ? <LoadingScreen /> : <BookingTable bookingsData={deletedPageData} cancel={true} />} */}
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