import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'react-native-paper';
import BookingsControl from '../../components/bookings-control';

const ActiveBookingsScreen = () => {
  const { isConnected } = useNetInfo();
  const { colors } = useTheme();

  return (
    <SafeAreaView>
      <ScrollView
        // horizontal={false}
        // scrollEnabled={false}
        // nestedScrollEnabled={true}
        style={{ ...styles.container, backgroundColor: colors.background }}
      // refreshControl={
      //   <RefreshControl
      //     enabled={isConnected && !isLoading}
      //     refreshing={isLoading}
      //     onRefresh={onCheckUpdatesHandler}
      //   />
      // }
      >
        <BookingsControl
          isConnected={isConnected}
        // createButtonEnabled={createButtonEnabled}
        // onBookingCreateHandler={onBookingCreateHandler}
        // onHandleOpenModals={onHandleOpenModals}
        />
        {/* <BookingsRender
          list={list}
          isConnected={isConnected}
          onBookingPressHandler={onBookingPressHandler}
        /> */}
        {/* STEP 1 DATE modal */}
        {/* {dateModal && (
        <Controller
          control={control}
          render={({ field: { onChange } }) => (
            <DateTimePicker
              minimumDate={new Date(dateString)}
              value={new Date(dateString)}
              mode="date"
              onChange={(e, selectedDate) => {
                if (e.type === 'dismissed') {
                  return setDateModal(false);
                }
                onChange(selectedDate);
                setDateModal(false);
                onHandleOpenModals('time');
              }}
            />
          )}
          name="date"
        />
      )} */}
      </ScrollView>
      {/* PORTAL */}
      {/* <TimeModal
      errors={errors}
      control={control}
      timeModal={timeModal}
      getValues={getValues}
      cancelModal={cancelModal}
      onHandleOpenModals={onHandleOpenModals}
    />

    <CountGuestsModal
      errors={errors}
      control={control}
      cancelModal={cancelModal}
      numberGuestModal={numberGuestModal}
      onHandleOpenModals={onHandleOpenModals}
    // currentStepModal={currentStepModal}
    // setCurrentStepModal={setCurrentStepModal}
    />

    <GuestName
      errors={errors}
      control={control}
      cancelModal={cancelModal}
      currentStepModal={currentStepModal}
      onBookingPressHandler={onHandleSubmitForm}
    /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 10,
    // paddingHorizontal: '10%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ActiveBookingsScreen
