import React from 'react'
import { Text, View } from 'react-native'
import Config from 'react-native-config';

const ActiveBookingsScreen = () => {
  console.log(Config.API_URL)
  return (
    <>
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-lime-400">Styling just works! 🎉</Text>
      </View>
    </>
  )
}

export default ActiveBookingsScreen
