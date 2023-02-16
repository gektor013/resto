import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useGetUsersQuery } from '../../store/api/usersApi';
import LoadingScreen from '../loading/index';



const Users = () => {
  const navigation = useNavigation()
  const { colors } = useTheme();
  const { isConnected } = useNetInfo();

  const { data: usersData, isLoading: usersDataLoading } = useGetUsersQuery('', {
    skip: isConnected === false
  })

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'All bookings',
      headerBackTitle: '',
      headerRight: () => (
        <Button
          icon="plus"
          mode="contained"
          onPress={() => navigation.navigate('userForm')}>
          Add new user
        </Button>
      ),
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTitleStyle: {
        color: colors.onBackground,
      },
    });
  }, [navigation]);



  return (
    <>
      {usersDataLoading ? (<LoadingScreen />) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
          {
            usersData?.map((user) => (
              <Card key={user.id} style={{ flexGrow: 1, minWidth: '40%', marginHorizontal: 10, marginVertical: 10 }}>
                <Card.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                  <Text variant="titleLarge">{user.username}</Text>
                  <Button
                    mode="contained"
                    compact={true}
                    onPress={() => navigation.navigate('userForm', user)}>
                    Profile
                  </Button>
                </Card.Content>
              </Card>
            ))
          }
        </View>
      )}
    </>
  )
}

const UsersScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView>
      <View style={{ ...styles.container, backgroundColor: colors.background }}
      >
        <Users />
        {/* {otherDayBookingFetch ? <LoadingScreen /> : <BookingTable bookingsData={bookingData} cancel={false} />} */}
      </View>
    </SafeAreaView>
  )
}

export default UsersScreen

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 10,
  },
})