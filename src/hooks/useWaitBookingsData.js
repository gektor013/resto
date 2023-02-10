import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { statusForWaitPage } from '../constants';
import { useGetAllBookingByParamsQuery } from '../store/api/bookingsApi';


const useWaitBookingsData = () => {
  const { isConnected } = useNetInfo();

  const { data: waitPageData, isFetching: waitIsFetch } = useGetAllBookingByParamsQuery(statusForWaitPage, {
    skip: !isConnected,
  })

  return {
    waitPageData, waitIsFetch
  }
}

export default useWaitBookingsData

