import React, { useState } from 'react'
import moment from 'moment';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Button, DataTable, useTheme, } from 'react-native-paper';
import { StyleSheet, View, Pressable, Text } from 'react-native'

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
import SwipeableRow from './swipeLayout';


const BookingTable = ({ bookingsData }) => {
  const dispatch = useDispatch()
  const bookingState = useSelector(state => state.bookingData)
  const isNewOrEdit = bookingState.isNewBooking || bookingState.isEdit
  const [deleteModal, setDeleteModal] = useState(false)
  const [checkBooking, setCheckBooking] = useState({})

  const handleChancheBookingStatus = (booking, status) => {
    let checkStatus = status

    if (booking.status === status) {
      checkStatus = 2
    }

    setCheckBooking({ id: booking?.id ? booking?.id : booking.internalID, status: checkStatus })

    const updateBooking = {
      ...booking,
      status: checkStatus,
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

  const onOpenModal = (booking) => {
    if (booking?.status === 1) return
    setDeleteModal(prev => !prev)
  }

  return bookingsData?.length || bookingState.isNewBooking ? (
    <>
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
        <FlatList
          data={isNewOrEdit ?
            [bookingState] : bookingsData}
          renderItem={({ item }) => (
            <SwipeableRow
              isNewOrEdit={isNewOrEdit}
              handleChancheBookingStatus={(status) => handleChancheBookingStatus(item, status)}
              onDelete={onOpenModal}
            >
              <>
                <Row
                  item={item}
                  key={item.id}
                  checkBooking={checkBooking}
                />
                <ModaLayout
                  visible={deleteModal}
                  onCancel={onOpenModal}
                  containerStyle={styles.deleteModalContainer}
                  saveTitle='Delete'
                  title={'Are you sure you want to delete booking?'}
                  onSave={() => {
                    handleChancheBookingStatus(item, 5)
                    onOpenModal()
                  }}
                >
                </ModaLayout>
              </>
            </SwipeableRow>
          )}
          keyExtractor={item => item.id ? item.id : item.internalID}
        />
      </DataTable>
    </>
  )
    : (
      <Text style={styles.text} variant="headlineLarge">
        No bookings yet
      </Text>
    );
}

const Row = ({ item, disabled, checkBooking }) => {
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
              style={{ paddingVertical: 5 }}
            >
              <DataTable.Cell style={styles.editContainer} onPress={() => onHandleOpenModals('time')}>
                {bookingState.startTime}-{bookingState.endTime}
              </DataTable.Cell>
              <DataTable.Cell style={styles.editContainer} onPress={() => onHandleOpenModals('guest')}>
                {bookingState.numberOfGuestsAdult}+{bookingState.numberOfGuestsChild}+{bookingState.numberOfGuestsBaby}
              </DataTable.Cell>
              <DataTable.Cell style={styles.editContainer} onPress={() => onHandleOpenModals('name')}>
                {definitionPrefixName(bookingState.prefixName)} {bookingState.name}
              </DataTable.Cell>
              <DataTable.Cell style={styles.editContainer} onPress={() => navigation.navigate('tablesScreen', { selectTable: bookingState.table, editTable: true })}>
                {`${findRoom(bookingState?.table?.id)?.name || 'Room'} ${bookingState.table?.name || ''}`}
              </DataTable.Cell>
              <DataTable.Cell onPress={() => onHandleOpenModals('comment')} style={styles.editContainer}>
                {bookingState.commentByAdminForAdmin || 'Comment'}
              </DataTable.Cell>
              <DataTable.Cell style={styles.editContainer} onPress={() => onHandleOpenModals('phone')}>
                {bookingState.phone || 'Phone'}
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
              style={{ backgroundColor: item.id === checkBooking?.id ? getRowColorByStatus(checkBooking.status) : getRowColorByStatus(status) }}
            >
              <DataTable.Cell>{startTime}-{endTime}</DataTable.Cell>
              <DataTable.Cell>{numberOfGuestsAdult}+{numberOfGuestsChild}+{numberOfGuestsBaby}</DataTable.Cell>
              <DataTable.Cell>{definitionPrefixName(prefixName)} {name}</DataTable.Cell>
              <DataTable.Cell>{`${table?.room?.name || ''} ${table?.name || ''}`}</DataTable.Cell>
              <DataTable.Cell>{commentByAdminForAdmin || ''}</DataTable.Cell>
              <DataTable.Cell>{phone || ''}</DataTable.Cell>
              <DataTable.Cell>{employee?.name || ''}{createdAt ? moment(createdAt).format('/DD-MM-YY HH:mm') : ''}</DataTable.Cell>
            </DataTable.Row>
          </Pressable>
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
  },
  editContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginRight: 10,
    paddingLeft: 10
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
  },
  deleteModalContainer: {
    maxWidth: '50%',
    marginLeft: '25%'
  },
});
