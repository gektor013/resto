import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SegmentedButtons, Surface, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const Tables = ({ selectedTable, setSelectedTable }) => {
  const [value, setValue] = useState(1);
  const { rooms: roomsData } = useSelector(state => state.rooms)
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      {
        <>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={
              roomsData ? roomsData?.map(item => ({
                value: item.id,
                label: item.name,
              })) : []
            }
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
            {
              roomsData?.find(arr => arr.id === value).tables.map((item, idx) => {
                return (
                  <TouchableOpacity key={item.createdAt + idx} onPress={() => setSelectedTable(item)}>
                    <Surface style={{ ...styles.surface, backgroundColor: selectedTable === item.id ? colors.primary : '#3fab1a' }} elevation={4}>
                      <Text>{item.name}</Text>
                      <Text>{item.seatQuantity} seats</Text>
                    </Surface>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </>
      }
    </SafeAreaView>
  )
}

export default Tables

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'flex-start',
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