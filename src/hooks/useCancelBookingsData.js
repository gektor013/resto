import { useNetInfo } from '@react-native-community/netinfo';
import { statusForDeletedPage } from '../constants';
import { useGetAllBookingByParamsQuery } from '../store/api/bookingsApi';


const useCancelBookingsData = () => {
  const { isConnected } = useNetInfo();

  const { data: deletedPageData, isFetching: deletedIsFetch } = useGetAllBookingByParamsQuery(statusForDeletedPage, {
    skip: !isConnected,
  })
  console.log(deletedPageData);

  return {
    deletedPageData, deletedIsFetch
  }
}

export default useCancelBookingsData

