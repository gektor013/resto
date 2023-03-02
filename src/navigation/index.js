import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import ActiveBookingsStack from './all-booking-stack/index';
import WaitingsBookingStack from './waitings-booking-stack';
import CanceledBookingStack from './canceled-booking-stack';
import TableStack from './tables-stack';
import { useSelector } from 'react-redux';
import { bookingsDataCS } from '../store/slice/bookingDataSlice';
// import UserStack from './user-stack/index';

const Navigation = () => {
  const bookingData = useSelector(bookingsDataCS)
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'all_bookings',
      title: 'All',
      focusedIcon: 'book-check-outline',
    },
    {
      key: 'waitings',
      title: 'Wait',
      focusedIcon: 'book-clock-outline',
    },
    {
      key: 'canceled',
      title: 'Trash',
      focusedIcon: 'book-cancel-outline',
    },
    // {
    //   key: 'table',
    //   title: 'Tables',
    //   focusedIcon: 'table-furniture',
    // },
    // {
    //   key: 'users',
    //   title: 'Users',
    //   focusedIcon: 'account-cog-outline',
    // },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    all_bookings: ActiveBookingsStack,
    waitings: WaitingsBookingStack,
    canceled: CanceledBookingStack,
    table: TableStack,
    // users: UserStack,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={(index) => {
        if (bookingData.isNewBooking || bookingData.isEdit) {
          return
        } else {
          setIndex(index)
        }
      }}
      renderScene={renderScene}
    />
  );
};

export default Navigation;
