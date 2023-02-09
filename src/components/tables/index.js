import { useNetInfo } from '@react-native-community/netinfo'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SegmentedButtons, Surface } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingScreen from '../../screens/loading'
import { useGetAllRoomsQuery } from '../../store/api/roomsApi'

const Tables = () => {
  const { isConnected } = useNetInfo();
  const [value, setValue] = useState(1);
  const { data: roomsData, isFetching: roomsFetching } = useGetAllRoomsQuery('', { skip: isConnected === false })

  return (
    <SafeAreaView style={styles.container}>
      {
        roomsFetching ? <LoadingScreen /> :
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
                roomsData?.find(arr => arr.id === value).tables.map(item => (
                  <Pressable key={item} onPress={() => console.log('Press')}>
                    <Surface style={styles.surface} elevation={4}>
                      <Text>Name</Text>
                      <Text>8 seats</Text>
                    </Surface>
                  </Pressable>
                ))
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