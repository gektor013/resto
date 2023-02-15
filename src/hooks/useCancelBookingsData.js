import { useState, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { statusForDeletedPage } from '../constants';
import { useGetAllBookingByParamsQuery } from '../store/api/bookingsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherDayDeletedBookings } from '../store/slice/bookingsSlice';
// import { useNavigation } from '@react-navigation/native';

const useCancelBookingsData = () => {
  const [deletedData, setDeletedData] = useState([])
  const { isConnected } = useNetInfo();
  const dispatch = useDispatch()
  const { allOtherDayDeletedBookings } = useSelector(state => state.bookings.other)
  const { edited, created } = useSelector(state => state.bookings.unsynchronized)

  const { data: deletedPageData, isFetching: deletedIsFetch } = useGetAllBookingByParamsQuery(statusForDeletedPage, {
    skip: !isConnected,
    refetchOnFocus: true,
    pollingInterval: 3000000
  })

  // console.log(allOtherDayDeletedBookings);

  // console.log(navigation.isFocused());
  useEffect(() => {
    if (deletedPageData && !deletedIsFetch) {
      dispatch(setOtherDayDeletedBookings(deletedPageData))
    }
  }, [deletedPageData])

  useEffect(() => {
    if (isConnected) {
      setDeletedData(allOtherDayDeletedBookings)
    } else {
      //find elemnt in edited
      const listDeleteSync = allOtherDayDeletedBookings?.map(syncDeleted => {
        const unsyncEditedIndex = edited.findIndex(
          unsyncEl => unsyncEl.id === syncDeleted.id
        );

        if (unsyncEditedIndex === -1) {
          return syncDeleted;
        }
      }).filter(elem => elem !== undefined)

      // filter by status 5
      const deletedUnsync = edited?.filter(elem => elem?.status === 5)
      const createdUnsync = created?.filter(elem => elem?.status === 5)

      // console.log(deletedUnsync, 'deletedUnsync');
      return setDeletedData([...deletedUnsync, ...createdUnsync, ...listDeleteSync])
    }
  }, [allOtherDayDeletedBookings, created, edited, isConnected])

  return {
    deletedData, deletedIsFetch
  }
}

export default useCancelBookingsData

