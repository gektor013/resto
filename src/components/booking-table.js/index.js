import React from 'react'
import moment from 'moment';
import { StyleSheet, View, Pressable } from 'react-native'
import { DataTable, Text, useTheme } from 'react-native-paper';
import SwipeableFlatList from 'react-native-swipeable-list';
import { useNavigation } from '@react-navigation/native';
import { usePatchBookingsMutation } from '../../store/api/bookingsApi';

const BookingTable = ({ bookingsData, navigation }) => {
  const [patchBookings] = usePatchBookingsMutation();
  // const { isLoading } = useBookingsData();

  const handleChancheBookingStatus = async (booking, status) => {
    await patchBookings({ ...booking, status }).unwrap()
      .then(res => console.log(res, 'Result handleChancheBookingStatus'))
      .catch(err => console.log(err, 'handleChancheBookingStatus'));
  };

  const QuickActions = (_, booking) => {
    return (
      <View style={styles.quickActionContainer}>
        <View style={styles.actionsContainer}>
          <View style={{ ...styles.action, backgroundColor: '#1c813f', }}>
            <Pressable onPress={() => handleChancheBookingStatus(booking, 4)}>
              <Text>Arrived</Text>
            </Pressable>
          </View>
          <View style={{ ...styles.action, backgroundColor: '#94a3b8' }}>
            <Pressable onPress={() => handleChancheBookingStatus(booking, 5)}>
              <Text>Delete</Text>
            </Pressable>
          </View>
          <View style={{ ...styles.action, backgroundColor: '#ef4747', }}>
            <Pressable onPress={() => handleChancheBookingStatus(booking, 1)}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return bookingsData?.length ? (
    <DataTable style={styles.mb150}>
      <DataTable.Header>
        <DataTable.Title>Zeit</DataTable.Title>
        <DataTable.Title>Pax</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Notizen</DataTable.Title>
        <DataTable.Title>Telefon</DataTable.Title>
        <DataTable.Title>Erstellt</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
      </DataTable.Header>
      <SwipeableFlatList
        keyExtractor={item => item.id ? item.id : item.internalID}
        data={bookingsData}
        renderItem={({ item }) => {
          return (
            <Row
              item={item}
              key={item.id}
            // disabled={isLoading}
            />
          )
        }}
        maxSwipeDistance={300}
        renderQuickActions={({ index, item }) => QuickActions(index, item)}
        contentContainerStyle={styles.swipeContainer}
        shouldBounceOnMount={false}
      // ItemSeparatorComponent={renderItemSeparator}
      />
    </DataTable>
  )
    : (
      <Text style={styles.text} variant="headlineLarge">
        No bookings yet
      </Text>
    );
}

const Row = ({ item, disabled }) => {
  const {
    id,
    name,
    phone,
    status,
    endTime,
    operation,
    createdAt,
    startTime,
    numberOfGuestsBaby,
    numberOfGuestsAdult,
    numberOfGuestsChild,
    commentByAdminForAdmin,
  } = item;
  const { colors } = useTheme();
  const navigation = useNavigation();


  const getRowColorByStatus = (status) => {
    switch (status) {
      case (1):
        return '#b91e1d'
      case (3):
        return '#323082'
      case (4):
        return '#0d976a'
      default: break
    }
  }

  const onBookingPressHandler = (item) => {
    console.log(item);
    navigation.navigate('form', item)
  }

  return (
    <View key={id} style={{ backgroundColor: item.unsync ? '#ebab3e' : colors.surface }}>
      <DataTable.Row
        disabled={disabled}
        onPress={() => onBookingPressHandler(item)}
        style={{
          // backgroundColor: operation ? colors.tertiaryContainer : null 
          backgroundColor: getRowColorByStatus(status)
        }}
      >
        <DataTable.Cell>{startTime}-{endTime}</DataTable.Cell>
        <DataTable.Cell>{numberOfGuestsAdult}+{numberOfGuestsChild}+{numberOfGuestsBaby}</DataTable.Cell>
        <DataTable.Cell>{name}</DataTable.Cell>
        <DataTable.Cell>{commentByAdminForAdmin}</DataTable.Cell>
        <DataTable.Cell>{phone}</DataTable.Cell>
        <DataTable.Cell>{moment(createdAt).format('DD-MM-YY HH:mm')}</DataTable.Cell>
        <DataTable.Cell>status {status}</DataTable.Cell>
      </DataTable.Row>
    </View>
  );
};

export default BookingTable

const styles = StyleSheet.create({
  mb150: {
    marginBottom: 150,
  },
  swipeContainer: {
    flexGrow: 1,
    // backgroundColor: darkColors.background,
  },
  text: {
    textAlign: 'center',
  },
  quickActionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionsContainer: {
    width: 300,
    flexDirection: 'row',
    height: '100%',
  },
  action: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});