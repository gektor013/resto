import React, { useState, useEffect } from 'react';
import Navigation from '../navigation';
import Loading from '../components/loading';
import {
  Button,
  // Snackbar,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
// import { useSynchronize } from '../hooks/useSynchronize';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteMessage } from '../store/slice/messagesSlice';
import { setIsChekingsLoading } from '../store/slice/controlSlice';

// const delay = 1;

const Layout = () => {
  const [visibleDialog, setDialogVisible] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.control)
  const { isConnected } = useNetInfo();

  const onDialogHandler = flag => {
    setDialogVisible(flag);
  };

  useEffect(() => {
    if (isConnected === false) onDialogHandler(true);
  }, [isConnected]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsChekingsLoading(false));
    }, 1000)
  }, [])

  return (
    <>
      {isLoading ? <Loading /> : <Navigation />}
      <Portal>
        <Dialog
          visible={visibleDialog}
          onDismiss={() => onDialogHandler(false)}>
          <Dialog.Title>Attention!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>You are offline!</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => onDialogHandler(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* <Snackbar
        visible={true}
        onDismiss={onMessageHide}
        duration={5000}
        action={{
          label: 'Hide',
          onPress: onMessageHide,
        }}>
        {message.message}
      </Snackbar> */}
    </>
  );
};

export default Layout;
