import { useEffect, useState } from 'react'
import { formatDateParams } from '../utils/dates'
import { clearUnsynchronizedCreateBookings, clearUnsynchronizedEditedBookings, createdUnsyncBookingCS, otherDayBookingsCS, setOtherDayAllBookings, setTodaysAllBookings, todayAllBookingsCS } from '../store/slice/bookingsSlice';
import { useCreateBookingMutation, useEditBookingMutation, useGetAllBookingByParamsQuery, useGetTodayBookingByParamsQuery } from '../store/api/bookingsApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { statusForActivePage } from '../constants';
import { useGetAllRoomsQuery } from '../store/api/roomsApi';
import { setAllRoomsData } from '../store/slice/roomsSlice';
import { resetBookingData } from '../store/slice/bookingDataSlice';
import { useGetAllEmployeesQuery } from '../store/api/employeeApi';
import { setAllEmployeesData } from '../store/slice/employeesSlice';
import useEmployees from './useEmployees';
import useTableForm from './useTableForm';
import { isNeedUpdateCS } from '../store/slice/controlSlice';

const useBookingsData = () => {
  const [bookingData, setBookingsData] = useState([])
  const dispatch = useDispatch()
  const { isConnected } = useNetInfo();

  //date selector
  const { date: dateString } = useSelector(state => state.control)
  const formatDate = formatDateParams(new Date(dateString))

  // console.log(bookingData[0], 'bookingsData');

  // booking selector
  const todayAllBookings = useSelector(todayAllBookingsCS)
  const otherDayBookings = useSelector(otherDayBookingsCS)
  const { created: createdUnsyncBooking, edited: editUnsyncBookings } = useSelector(createdUnsyncBookingCS)

  console.log(editUnsyncBookings, 'editUnsyncBookings');
  const isNeedUpdate = useSelector(isNeedUpdateCS)

  const [createBooking] = useCreateBookingMutation('', { skip: !isConnected })
  const [editBookings] = useEditBookingMutation('', { skip: !isConnected })

  // Employees HOOK
  const { unsyncEmployees, isEmployeeSynchronaized } = useEmployees(isConnected)
  // Rooms & tables HOOK
  const { isTableSynchronaized } = useTableForm(isEmployeeSynchronaized, isConnected)

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
  const onEditBookings = (data) => {
    if (!data?.table.id) return

    editBookings(data).unwrap()
      .then(res => {
        if (res) {
          dispatch(clearUnsynchronizedEditedBookings(data))
        }
      })
      .catch(e => console.log(e, 'onEditBookings error'))
      .finally(() => dispatch(resetBookingData()))
  }

  // send when there is internet
  const sendUnsyncCreatedBookings = async (data) => {
    if (!data?.employee?.id) return

    createBooking(data).unwrap()
      .then(res => {
        if (res) {
          dispatch(clearUnsynchronizedCreateBookings({ internalID: data.internalID }))
        }
      })
      .catch(e => {
        console.log(e, 'sendUnsyncCreatedBookings ERROR')
      })
      .finally(() => dispatch(resetBookingData()))
  }

  // useEffect(() => {
  //   if (createdUnsyncBooking?.length && unsyncEmployees?.length && isConnected && !isNeedUpdate) {
  //     sendUnsyncCreatedEmployees(unsyncEmployees[0])
  //   }
  // }, [unsyncEmployees, isConnected, isNeedUpdate])

  useEffect(() => {
    if (createdUnsyncBooking?.length && isTableSynchronaized && isConnected && !isNeedUpdate) {
      sendUnsyncCreatedBookings(createdUnsyncBooking[0])
    }
  }, [createdUnsyncBooking, isConnected, isNeedUpdate, isTableSynchronaized])


  // send when there is internet
  useEffect(() => {
    if (editUnsyncBookings?.length && isTableSynchronaized && isConnected && !isNeedUpdate) {
      onEditBookings(editUnsyncBookings[0])
    }
  }, [editUnsyncBookings, isConnected, isNeedUpdate, isTableSynchronaized])

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
      setBookingsData([...otherDayBookings])

      // setBookingsData([...createdUnsyncBooking, ...editUnsyncBookings, ...otherDayBookings])
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