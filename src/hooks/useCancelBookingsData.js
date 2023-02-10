import { useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { statusForDeletedPage } from '../constants';
import { useGetAllBookingByParamsQuery } from '../store/api/bookingsApi';


const useCancelBookingsData = () => {
  const [deletedData, setDeletedData] = useState([])
  const { isConnected } = useNetInfo();

  const { data: deletedPageData, isFetching: deletedIsFetch } = useGetAllBookingByParamsQuery(statusForDeletedPage, {
    skip: !isConnected,
    refetchOnFocus: true,
    pollingInterval: 3000000
  })



  return {
    deletedPageData, deletedIsFetch
  }
}

export default useCancelBookingsData

