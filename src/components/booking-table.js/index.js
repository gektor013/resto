import React from 'react'
import moment from 'moment';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';
import { DataTable, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { setUnsynchronizedEditedBookings, removeUnsynchronizedEditedBookingsById, setUnsynchronizedCreateBookings } from '../../store/slice/bookingsSlice';
import { definitionPrefixName, getRowColorByStatus } from '../../utils/helpers';

const BookingTable = ({ bookingsData, cancel }) => {
  const dispatch = useDispatch()
  const { allOtherDayDeletedBookings } = useSelector(state => state.bookings.other)

  const handleChancheBookingStatus = (booking, status) => {
    const updateBooking = {
      ...booking,
      status,
      internalID: booking?.internalID ? booking?.internalID : uuid.v4(),
      unsync: true
    }

    if (booking.status === 5) {
      if (booking.id) {
        const isSyncDeleted = allOtherDayDeletedBookings.some(elem => elem.id === booking.id)
        if (isSyncDeleted) {
          dispatch(setUnsynchronizedEditedBookings(updateBooking))
        } else {
          dispatch(removeUnsynchronizedEditedBookingsById(booking.id))
        }
      } else {
        dispatch(setUnsynchronizedCreateBookings(updateBooking))
      }
    } else {

      dispatch(setUnsynchronizedEditedBookings(updateBooking))
    }

  };

  const QuickActions = (_, booking) => {
    return (
      <View style={styles.quickActionContainer}>
        <View style={{ ...styles.actionsContainer, width: !cancel ? 300 : 100 }}>
          {!cancel ? (
            <>
              <View style={{ ...styles.action, backgroundColor: '#1c813f', }}>
                <TouchableOpacity onPress={() => handleChancheBookingStatus(booking, 4)}>
                  <Text>Arrived</Text>
                </TouchableOpacity>
              </View>
              <View style={{ ...styles.action, backgroundColor: '#94a3b8' }}>
                <TouchableOpacity onPress={() => handleChancheBookingStatus(booking, 5)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
              <View style={{ ...styles.action, backgroundColor: '#ef4747', }}>
                <TouchableOpacity onPress={() => handleChancheBookingStatus(booking, 1)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={{ ...styles.action, flex: 2, backgroundColor: '#94a3b8' }}>
              <TouchableOpacity onPress={() => handleChancheBookingStatus(booking, 0)}>
                <Text>Restore</Text>
              </TouchableOpacity>
            </View>
          )}
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
        <DataTable.Title>Tischs</DataTable.Title>
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
            />
          )
        }}
        maxSwipeDistance={!cancel ? 300 : 100}
        renderQuickActions={({ index, item }) => QuickActions(index, item)}
        contentContainerStyle={styles.swipeContainer}
        shouldBounceOnMount={false}
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
    table,
    status,
    endTime,
    prefixName,
    createdAt,
    startTime,
    numberOfGuestsBaby,
    numberOfGuestsAdult,
    numberOfGuestsChild,
    commentByAdminForAdmin,
  } = item;
  const { colors } = useTheme();
  const navigation = useNavigation();

  const onBookingPressHandler = (item) => {
    navigation.navigate('form', item)
  }

  return (
    <View key={id} style={{ backgroundColor: item.unsync ? '#ebab3e' : colors.surface }}>
      <DataTable.Row
        disabled={disabled}
        onPress={() => onBookingPressHandler(item)}
        style={{ backgroundColor: getRowColorByStatus(status) }}
      >
        <DataTable.Cell>{startTime}-{endTime}</DataTable.Cell>
        <DataTable.Cell>{numberOfGuestsAdult}+{numberOfGuestsChild}+{numberOfGuestsBaby}</DataTable.Cell>
        <DataTable.Cell>{definitionPrefixName(prefixName)} {name}</DataTable.Cell>
        <DataTable.Cell>{`${table?.room?.name}, ${table?.name}`}</DataTable.Cell>
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