import moment from 'moment';
import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { DataTable, Text, useTheme } from 'react-native-paper';
import SwipeableFlatList from 'react-native-swipeable-list';

const list = [
  {
    id: 496,
    date: "6 Feb 2023",
    startTime: "13:00",
    endTime: "14:00",
    prefixName: 0,
    name: "Igor",
    phone: "",
    numberOfGuests: "",
    numberOfGuestsAdult: 1,
    numberOfGuestsChild: 1,
    numberOfGuestsBaby: 1,
    status: 0,
    commentByAdminForAdmin: "",
    uuid: "854a2f48-f029-425d-ac11-d85e5b29bc95",
    createdAt: "2023-02-06T10:48:31+00:00"
  }
]

const BookingTable = ({ bookingsData }) => {
  // const [patchBookings] = usePatchBookingsMutation();
  // const { isLoading } = useBookingsData();

  // const handleChancheBookingStatus = async (booking, status) => {
  //   await patchBookings({ ...booking, status }).unwrap()
  //     .then(res => console.log(res, 'Result handleChancheBookingStatus'))
  //     .catch(err => console.log(err, 'handleChancheBookingStatus'));
  // };

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

  return bookingsData.length ? (
    <DataTable style={styles.mb150}>
      <DataTable.Header>
        <DataTable.Title>Zeit</DataTable.Title>
        <DataTable.Title>Pax</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Notizen</DataTable.Title>
        <DataTable.Title>Telefon</DataTable.Title>
        <DataTable.Title>Erstellt</DataTable.Title>
        <DataTable.Title>SSSSSSS</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
      </DataTable.Header>
      <SwipeableFlatList
        keyExtractor={item => item.id}
        data={bookingsData}
        renderItem={({ item }) => (
          <Row
            item={item}
            key={item.id}
          // disabled={isLoading}
          // onBookingPressHandler={onBookingPressHandler}
          />
        )}
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

const Row = ({ item, disabled, onBookingPressHandler }) => {
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

  return (
    <View key={id} style={{ backgroundColor: colors.surface }}>
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
        {/* <DataTable.Cell>{moment(createdAt).format('DD-MM-YY HH:mm')}</DataTable.Cell> */}
        <DataTable.Cell> status{status}</DataTable.Cell>
        <DataTable.Cell>
          {/* <Icon
            name={getIconName(status)}
            color={colors[operation ? 'error' : 'primary']}
            size={24}
          /> */}
        </DataTable.Cell>
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