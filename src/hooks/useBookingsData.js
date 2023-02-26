import { useCallback, useEffect, useMemo, useState } from 'react'
import { formatDateParams } from '../utils/dates'
import { clearUnsynchronizedCreateBookings, clearUnsynchronizedEditedBookings, setOtherDayAllBookings, setTodaysAllBookings, setUnsyncEmployeeToUnsyncCreated } from '../store/slice/bookingsSlice';
import { useCreateBookingMutation, useEditBookingMutation, useGetAllBookingByParamsQuery, useGetTodayBookingByParamsQuery } from '../store/api/bookingsApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { statusForActivePage } from '../constants';
import { useGetAllRoomsQuery } from '../store/api/roomsApi';
import { setAllRoomsData } from '../store/slice/roomsSlice';
import { resetBookingData } from '../store/slice/bookingDataSlice';
import { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeesQuery } from '../store/api/employeeApi';
import { deletedEmployeesCS, unsyncEmployeesDataCS, removeUnsyncEmployee, setAllEmployeesData, clearDeletedEmployee, } from '../store/slice/employeesSlice';


const useBookingsData = () => {
  const [bookingData, setBookingsData] = useState([])
  const dispatch = useDispatch()
  const { isConnected } = useNetInfo();

  const { date: dateString } = useSelector(state => state.control)
  const { allBooking: todayAllBookings } = useSelector(state => state.bookings.todays)
  const { allOtherDayBooking: otherDayBookings } = useSelector(state => state.bookings.other)
  const { isNeedUpdate } = useSelector(state => state.control)
  const { created: createdUnsyncBooking, edited: editUnsyncBookings } = useSelector(state => state.bookings.unsynchronized)

  const unsyncEmployees = useSelector(unsyncEmployeesDataCS);
  const deletedEmployees = useSelector(deletedEmployeesCS);

  const formatDate = formatDateParams(new Date(dateString))

  const [createBooking] = useCreateBookingMutation('', { skip: !isConnected })
  const [editBookings] = useEditBookingMutation('', { skip: !isConnected })

  const [createEmployee] = useCreateEmployeeMutation()
  const [deleteEmployee] = useDeleteEmployeeMutation()


  // get only todays booking, it is necessary for the missing internet
  const { data: getTodayBookingsData } = useGetTodayBookingByParamsQuery(`${statusForActivePage}&date=${formatDate}`, {
    skip: !isConnected || isNeedUpdate,
    refetchOnReconnect: true,
    pollingInterval: 300000,
  })

  // get all booking by date and query params
  const { data: getOtherDayBookingsData, isFetching: otherDayBookingFetch } = useGetAllBookingByParamsQuery(`${statusForActivePage}&date=${formatDate}`, {
    skip: !isConnected || isNeedUpdate,
    refetchOnReconnect: true,
    pollingInterval: 300000,
    refetchOnMountOrArgChange: true
  })

  // get all rooms data in first render
  const { data: roomsData } = useGetAllRoomsQuery('', {
    skip: !isConnected,
  })

  // get all employees data in first render
  const { data: employeesData } = useGetAllEmployeesQuery('', {
    skip: !isConnected,
  })

  // edit bookings
  const onEditBookings = () => {
    Array.from(editUnsyncBookings, (booking) => {
      editBookings(booking).unwrap()
        .then(res => {
          if (res) {
            dispatch(clearUnsynchronizedEditedBookings(booking))
          }
        })
        .catch(e => console.log(e, 'onEditBookings error'))
        .finally(() => dispatch(resetBookingData()))
    })
  }

  // send when there is internet
  const sendUnsyncCreatedBookings = async () => {
    if (!createdUnsyncBooking[0]?.employee?.id) return

    createBooking(createdUnsyncBooking[0]).unwrap()
      .then(res => {
        if (res) {
          dispatch(clearUnsynchronizedCreateBookings(createdUnsyncBooking[0]))
        }
      })
      .catch(e => {
        console.log(e, 'sendUnsyncCreatedBookings ERROR')
      })
      .finally(() => dispatch(resetBookingData()))
  }

  const sendUnsyncCreatedEmployees = async () => {
    await createEmployee(unsyncEmployees[0]).unwrap()
      .then(res => {
        dispatch(removeUnsyncEmployee(unsyncEmployees[0]))
        dispatch(setUnsyncEmployeeToUnsyncCreated({ id: res.id, ...unsyncEmployees[0] }))
      })
      .catch(e => {
        console.log(e, 'sendUnsyncCreatedEmployees ERROR')
      })
  }

  const onDeleteEmployees = async () => {
    Array.from(deletedEmployees, (employee) => {
      deleteEmployee(employee.id).unwrap()
        .then(() => dispatch(clearDeletedEmployee()))
        .catch((e) => console.log(e, 'onDeleteEmployees ERROR'))
    })
  }

  useEffect(() => {
    if (createdUnsyncBooking?.length && unsyncEmployees?.length && isConnected && !isNeedUpdate) {
      sendUnsyncCreatedEmployees()
        .then(() => sendUnsyncCreatedBookings())
      // Promise.all([
      //   sendUnsyncCreatedEmployees(),
      //   sendUnsyncCreatedBookings()
      // ]).then((res) => console.log(res, console.log('Promise res')))
    }
  }, [createdUnsyncBooking, unsyncEmployees, isConnected, isNeedUpdate])

  // send when there is internet
  useEffect(() => {
    if (editUnsyncBookings?.length && isConnected && !isNeedUpdate) {
      onEditBookings()
    }
  }, [editUnsyncBookings, isConnected, isNeedUpdate])

  // send other day when there is internet
  useEffect(() => {
    if (createdUnsyncBooking[0]?.employee?.id && isConnected && !isNeedUpdate && !unsyncEmployees?.length) {
      sendUnsyncCreatedBookings()
      // console.log('sendUnsyncCreatedBookings');
    }
  }, [createdUnsyncBooking, isConnected, isNeedUpdate, unsyncEmployees])

  useEffect(() => {
    if (deletedEmployees?.length && isConnected) {
      onDeleteEmployees()
    }
  }, [deletedEmployees, isConnected])

  // first render we send to persist actual rooms & employe data 
  useEffect(() => {
    if (roomsData?.length) {
      dispatch(setAllRoomsData(roomsData))
    }

    if (employeesData?.length) {
      dispatch(setAllEmployeesData(employeesData))
    }
  }, [roomsData, employeesData])

  useEffect(() => {
    if (getTodayBookingsData?.length) {
      dispatch(setTodaysAllBookings(getTodayBookingsData))
    }
  }, [getTodayBookingsData])

  useEffect(() => {
    if (getOtherDayBookingsData) {
      dispatch(setOtherDayAllBookings(getOtherDayBookingsData))
    }
  }, [getOtherDayBookingsData])

  useEffect(() => {
    //data redux
    if (isConnected === true && !isNeedUpdate) {
      setBookingsData([...createdUnsyncBooking, ...editUnsyncBookings, ...otherDayBookings])
    } else if (isConnected === false) {
      const unsyncCreated = createdUnsyncBooking.filter(elem => elem.status !== 5)
      const unsyncEdited = editUnsyncBookings.filter(elem => elem.status !== 5)

      const syncTodayAllBooking = todayAllBookings?.map(syncToday => {
        const unsyncEditedIndex = editUnsyncBookings.findIndex(
          unsyncEl => unsyncEl.id === syncToday.id
        );

        if (unsyncEditedIndex === -1) {
          return syncToday;
        }
      }).filter(elem => elem !== undefined)


      setBookingsData([...unsyncCreated, ...unsyncEdited, ...syncTodayAllBooking])
    }
  }, [isConnected, createdUnsyncBooking, editUnsyncBookings, otherDayBookings, todayAllBookings, isNeedUpdate])

  return {
    bookingData,
    otherDayBookingFetch
  }
}

export default useBookingsData;