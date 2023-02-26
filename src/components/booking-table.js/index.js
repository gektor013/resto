import React, { useState } from 'react'
import moment from 'moment';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableFlatList from 'react-native-swipeable-list';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, DataTable, Text, useTheme, } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, Pressable } from 'react-native'

import { setEditBookingData } from '../../store/slice/bookingDataSlice';
import { setUnsynchronizedEditedBookings, setUnsynchronizedCreateBookings } from '../../store/slice/bookingsSlice';

import { definitionPrefixName, getRowColorByStatus } from '../../utils/helpers';
import Employees from '../employee-modal';
import TimeModal from '../booking-modals/time';
import ModaLayout from '../../layout/modal-layout';
import NameGuest from '../booking-modals/nameGuest';
import NumberGuset from '../booking-modals/numberGuest';
import ComentAndPhone from '../booking-modals/comentAndPhone';
import useModalsControl from '../../hooks/useModalsControl';
import useBookingForm from '../../hooks/useBookingForm';

const BookingTable = ({ bookingsData, cancel }) => {
  const route = useRoute()
  const dispatch = useDispatch()
  const bookingState = useSelector(state => state.bookingData)
  const isNewOrEdit = bookingState.isNewBooking || bookingState.isEdit

  const handleChancheBookingStatus = (booking, status) => {
    const updateBooking = {
      ...booking,
      status,
      internalID: booking?.internalID ? booking?.internalID : uuid.v4(),
      unsync: true
    }

    if (booking.id) {
      dispatch(setUnsynchronizedEditedBookings(updateBooking))
    } else {
      // if have intenalID
      dispatch(setUnsynchronizedCreateBookings(updateBooking))
    }
  };

  const QuickActions = (_, booking) => {
    return (
      <View style={styles.quickActionContainer}>
        <View style={{ ...styles.actionsContainer, width: !cancel ? 300 : 100 }}>
          {route.name !== 'cancelBookings' ? (
            <>
              <View style={{ ...styles.action, backgroundColor: '#1c813f', }}>
                <TouchableOpacity onPress={() => handleChancheBookingStatus(booking, 4)}>
                  <Text>{route.name === 'waitBookings' ? 'Approve' : 'Arrived'}</Text>
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
              <TouchableOpacity onPress={() => handleChancheBookingStatus(booking, 2)}>
                <Text>Restore</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return bookingsData?.length || bookingState.isNewBooking ? (
    <DataTable style={styles.tableContainer}>
      <DataTable.Header>
        <DataTable.Title>Zeit</DataTable.Title>
        <DataTable.Title>Pax</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Tisch</DataTable.Title>
        <DataTable.Title>Notizen</DataTable.Title>
        <DataTable.Title>Telefon</DataTable.Title>
        {
          isNewOrEdit ? null :
            <DataTable.Title>Erstellt</DataTable.Title>
        }
      </DataTable.Header>
      <SwipeableFlatList
        keyExtractor={item => item.id ? item.id : item.internalID}
        data={isNewOrEdit ?
          [bookingState] : bookingsData}
        renderItem={({ item }) => {
          return (
            <Row
              item={item}
              key={item.id}
            />
          )
        }}
        maxSwipeDistance={!cancel ? 300 : 100}
        renderQuickActions={({ index, item }) => (isNewOrEdit ? null : QuickActions(index, item))}
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
    name,
    phone,
    table,
    status,
    endTime,
    employee,
    prefixName,
    createdAt,
    startTime,
    numberOfGuestsBaby,
    numberOfGuestsAdult,
    numberOfGuestsChild,
    commentByAdminForAdmin,
  } = item;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isShowInput, setIsShowInput] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const { modalsState, onHandleOpenModals, cancelModal } = useModalsControl()
  const { timeModal, numberGuestModal, nameGuestModal, commentAdminModal, phoneModal, employeeModal } = modalsState;
  const { bookingState, findRoom, onSubmitWithMode } = useBookingForm()

  return (
    <>
      {bookingState.isNewBooking || bookingState.isEdit ?
        (
          <View style={{ backgroundColor: colors.surface }}>
            <DataTable.Row
              disabled={disabled}
            >
              <DataTable.Cell >
                <TouchableOpacity onPress={() => onHandleOpenModals('time')} style={{ alignItems: 'center' }}>
                  <View style={styles.editContainer}>
                    <Text >
                      {bookingState.startTime}-{bookingState.endTime}
                    </Text>
                  </View>
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity onPress={() => onHandleOpenModals('guest')} style={{ alignItems: 'center' }}>
                  <View style={styles.editContainer}>
                    <Text >
                      {bookingState.numberOfGuestsAdult}+{bookingState.numberOfGuestsChild}+{bookingState.numberOfGuestsBaby}
                    </Text>
                  </View>
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity onPress={() => onHandleOpenModals('name')} style={{ alignItems: 'center' }}>
                  <View style={styles.editContainer}>
                    <Text >
                      {definitionPrefixName(bookingState.prefixName)} {bookingState.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity onPress={() => navigation.navigate('tablesScreen', { selectTable: bookingState.table, editTable: true })} style={{ alignItems: 'center' }}>
                  <View style={styles.editContainer}>
                    <Text >
                      {`${findRoom(bookingState.table?.id)?.name || 'Room'} ${bookingState.table?.name || ''}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity onPress={() => onHandleOpenModals('comment')} style={{ alignItems: 'center' }}>
                  <View style={styles.editContainer}>
                    <Text >
                      {bookingState.commentByAdminForAdmin || 'Comment'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity onPress={() => onHandleOpenModals('phone')} style={{ alignItems: 'center' }}>
                  <View style={styles.editContainer}>
                    <Text >
                      {bookingState.phone || 'Phone'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <Button
                mode="contained"
                style={{ marginRight: 5, flex: 1 }}
                onPress={() => cancelModal('phone')}
              >
                Cancel
              </Button>

              <Button
                mode="contained"
                style={{ flex: 1 }}
                onPress={() => {
                  bookingState.isEdit ? onSubmitWithMode() : onHandleOpenModals('employee')
                }}
              >
                Save
              </Button>
            </View>

          </View>
        ) : (
          <Pressable
            onLongPress={() => dispatch(setEditBookingData(item))}
            style={{ backgroundColor: item.unsync ? '#ebab3e' : colors.surface }}>
            <DataTable.Row
              disabled={disabled}
              style={{ backgroundColor: getRowColorByStatus(status) }}
            >
              <DataTable.Cell>{startTime}-{endTime}</DataTable.Cell>
              <DataTable.Cell>{numberOfGuestsAdult}+{numberOfGuestsChild}+{numberOfGuestsBaby}</DataTable.Cell>
              <DataTable.Cell>{definitionPrefixName(prefixName)} {name}</DataTable.Cell>
              <DataTable.Cell>{`${table?.room?.name || ''} ${table?.name || ''}`}</DataTable.Cell>
              <DataTable.Cell>{commentByAdminForAdmin || ''}</DataTable.Cell>
              <DataTable.Cell>{phone || ''}</DataTable.Cell>
              <DataTable.Cell>{employee?.name || ''}{createdAt ? moment(createdAt).format('/DD-MM-YY HH:mm') : ''}</DataTable.Cell>
            </DataTable.Row>
          </Pressable >
        )
      }

      <ModaLayout
        visible={timeModal}
        onCancel={() => cancelModal('time', false)}
        title={'Time'}
        onSave={() => cancelModal('time', false)}
        disabled={(bookingState.startTime?.length < 5 || bookingState.endTime?.length < 5)}
      >
        <TimeModal />
      </ModaLayout>

      <ModaLayout
        visible={numberGuestModal}
        onCancel={() => cancelModal('guest', false)}
        title={'Number of guest'}
        onSave={() => {
          cancelModal('guest', false)
        }}
      >
        <NumberGuset />
      </ModaLayout>

      <ModaLayout
        visible={nameGuestModal}
        onCancel={() => cancelModal('name', false)}
        title={'Enter name'}
        onSave={() => {
          cancelModal('name', false)
        }}
        disabled={bookingState.name === ''}
      >
        <NameGuest />
      </ModaLayout>

      <ModaLayout
        visible={commentAdminModal}
        onCancel={() => cancelModal('comment', false)}
        title={'Enter comment'}
        onSave={() => {
          cancelModal('comment', false)
        }}
      >
        <ComentAndPhone valueType={'commentByAdminForAdmin'} />
      </ModaLayout>

      <ModaLayout
        visible={phoneModal}
        onCancel={() => cancelModal('phone', false)}
        title={'Enter Phone'}
        onSave={() => {
          cancelModal('phone', false)
        }}
      >
        <ComentAndPhone valueType={'phone'} />
      </ModaLayout>

      <ModaLayout
        visible={employeeModal}
        onCancel={() => {
          cancelModal('employee', false)
          setSelectedEmployee(null)
        }}
        title={'Select employee'}
        disabled={selectedEmployee === null}
        addBtn={true}
        addCallBack={() => setIsShowInput(true)}
        onSave={() => {
          cancelModal('employee', false)
          onSubmitWithMode()
        }}
      >
        <Employees
          isShowInput={isShowInput}
          onCancel={() => setIsShowInput(false)}
          setIsShowInput={setIsShowInput}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
        />
      </ModaLayout>
    </>


  );
};

export default BookingTable

const styles = StyleSheet.create({
  mb150: {
    marginBottom: 150,
  },
  tableContainer: {
    flex: 1
  },
  swipeContainer: {
    flexGrow: 1,
    // backgroundColor: darkColors.background,
  },
  editContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5
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
  maxW8: {
    maxWidth: '8%'
  },
  maxW15: {
    maxWidth: "15%"
  }
});


// <View key={id} style={{ backgroundColor: item.unsync ? '#ebab3e' : colors.surface }}>
    //   <DataTable.Row
    //     disabled={disabled}
    //     // onPress={() => onBookingPressHandler(item)}
    //     style={{ backgroundColor: getRowColorByStatus(status) }}
    //   >
    //     <DataTable.Cell >
    //       <View style={id === 677 ? styles.editContainer : null}>
    //         <Text >
    //           {startTime}-{endTime}
    //         </Text>
    //       </View>
    //     </DataTable.Cell>
    //     <DataTable.Cell>{numberOfGuestsAdult}+{numberOfGuestsChild}+{numberOfGuestsBaby}</DataTable.Cell>
    //     <DataTable.Cell>{definitionPrefixName(prefixName)} {name}</DataTable.Cell>
    //     <DataTable.Cell>{`${table?.room?.name} ${table?.name}`}</DataTable.Cell>
    //     <DataTable.Cell>{commentByAdminForAdmin}</DataTable.Cell>
    //     <DataTable.Cell>{phone}</DataTable.Cell>
    //     <DataTable.Cell>{employee?.name}/{moment(createdAt).format('DD-MM-YY HH:mm')}</DataTable.Cell>
    //   </DataTable.Row>
    //   {
    //     id === 677 && (
    //       <View style={{ flexDirection: 'row', marginVertical: 10 }}>
    //         <Button
    //           mode="contained"
    //           // compact={true}
    //           // disabled={!isConnected}
    //           style={{ marginRight: 5, flex: 1 }}
    //         // onPress={() => dayPlus('minus')}
    //         >
    //           Save
    //         </Button>

    //         <Button
    //           mode="contained"
    //           // compact={true}
    //           // disabled={!isConnected}
    //           style={{ flex: 1 }}
    //         // onPress={() => dayPlus('minus')}
    //         >
    //           Cancel
    //         </Button>
    //       </View>
    //     )
    //   }
    // </View >


 // if (booking.id) {
    //   const syncDeleted = allOtherDayDeletedBookings.find(elem => elem.id === booking.id)
    //   const syncToday = allBooking.find(elem => elem.id === booking.id)

    //   const copyUpdateBooking = JSON.parse(JSON.stringify(updateBooking))
    //   delete copyUpdateBooking.internalID
    //   delete copyUpdateBooking.unsync

    //   console.log(copyUpdateBooking, 'copyUpdateBooking');

    //   if (syncDeleted) {
    //     const stringSyncDeleted = JSON.stringify(syncDeleted)
    //     const stringUpdateBooking = JSON.stringify(copyUpdateBooking)

    //     if (stringSyncDeleted === stringUpdateBooking) {
    //       console.log('REMOVE SYNC DELTED');

    //       dispatch(removeUnsynchronizedEditedBookingsById(booking.id))
    //     } else {
    //       dispatch(setUnsynchronizedEditedBookings(updateBooking))
    //     }
    //   }

    //   else if (syncToday) {
    //     const stringSyncToday = JSON.stringify(syncToday)
    //     const stringUpdateBooking = JSON.stringify(copyUpdateBooking)

    //     console.log(stringSyncToday, 'stringSyncToday', stringUpdateBooking, 'stringUpdateBooking');
    //     if (stringSyncToday === stringUpdateBooking) {
    //       console.log('REMOVE SYNC TODAY');
    //       dispatch(removeUnsynchronizedEditedBookingsById(booking.id))
    //     } else {
    //       console.log('ELSE');
    //       dispatch(setUnsynchronizedEditedBookings(updateBooking))
    //     }
    //   }

    // } else {
    //   // if have intenalID
    //   dispatch(setUnsynchronizedCreateBookings(updateBooking))
    // }