import React, { useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

const GmailStyleSwipeableRow = ({ children, handleChancheBookingStatus, isNewOrEdit, onDelete }) => {
  const route = useRoute()
  let _swipeableRow;
  let toggled = useRef(true);

  const handleToggleBody = () => {
    toggled.current = !toggled.current;
  }

  const handleSwipeOpen = (e) => {
    handleToggleBody()
    if (e === 'left') {
      close()
      handleChancheBookingStatus(4)
    }
  }

  const renderLeftActions = () => {
    return (
      <RectButton enabled={false} style={[styles.leftAction]}>
        <Button
          elevation={10}
          mode="contained"
          buttonColor='#1c813f'
          loading={toggled.current}
        >
          Approve
        </Button>
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

  useEffect(() => { handleToggleBody() }, [])

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
      onSwipeableClose={handleToggleBody}
    >
      {children}
    </Swipeable>
  );

}

export default GmailStyleSwipeableRow

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#1c813f',
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