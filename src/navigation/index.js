import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import ActiveBookingsStack from './all-booking-stack/index';
// import WaitingsBookingStack from './waitings-booking-stack';
// import CanceledBookingStack from './canceled-booking-stack';

const Navigation = () => {
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
  ]);
  const renderScene = BottomNavigation.SceneMap({
    all_bookings: ActiveBookingsStack,
    // waitings: WaitingsBookingStack,
    // canceled: CanceledBookingStack,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Navigation;
