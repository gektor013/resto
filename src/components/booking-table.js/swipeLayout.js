import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const GmailStyleSwipeableRow = ({ children, handleChancheBookingStatus, isNewOrEdit, onDelete }) => {
  const route = useRoute()
  let _swipeableRow;

  const handleSwipeOpen = (e) => {
    if (e === 'left') {
      close()
      handleChancheBookingStatus(4)
    }
  }

  const renderLeftActions = () => {
    return (
      <RectButton style={[styles.leftAction]} onPress={close}>
        <Text>{route.name === 'waitBookings' ? 'Approve' : 'Arrived'}</Text>
      </RectButton>
    );
  };

  const renderRightAction = (text, color, status) => {

    const onPress = () => {
      if (status === 5) {
        return onDelete()
      }
      handleChancheBookingStatus(status)
    }
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={onPress}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = () => {
    const arrivedOrApprove = route.name === 'waitBookings' ? 'Approve' : 'Arrived'
    return (
      <View style={{ width: 300, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
        {route.name !== 'cancelBookings' ? (
          <>
            {renderRightAction(arrivedOrApprove, '#1c813f', 4)}
            {renderRightAction('Delete', '#94a3b8', 5)}
            {renderRightAction('Cancel', '#ef4747', 1)}
          </>
        ) : (renderRightAction('Restore', '#94a3b8', 2))}
      </View>
    )
  };

  const updateRef = ref => {
    _swipeableRow = ref;
  };

  const close = () => {
    _swipeableRow.close();
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={1}
      leftThreshold={1}
      overshootLeft={false}
      rightThreshold={41}
      overshootRight={false}
      renderLeftActions={isNewOrEdit || route.name === 'cancelBookings' ? null : renderLeftActions}
      renderRightActions={isNewOrEdit ? null : renderRightActions}
      onSwipeableOpen={handleSwipeOpen}
    >
      {children}
    </Swipeable>
  );

}

export default GmailStyleSwipeableRow

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    maxWidth: 150
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'center'
  }
});