import React, { useState, useEffect } from 'react';
import Navigation from '../navigation';
import Loading from '../components/loading';
import {
  Button,
  Snackbar,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
// import { useSynchronize } from '../hooks/useSynchronize';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage } from '../store/slice/messagesSlice';

const delay = 1;

const Layout = () => {
  const [visibleDialog, setDialogVisible] = useState(false);
  const [message, setMessage] = useState(false);
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();
  // const { isLoading } = useSynchronize();
  // const { isConnected } = useNetInfo();

  const onDialogHandler = flag => {
    setDialogVisible(flag);
  };

  const onMessageHide = () => {
    dispatch(deleteMessage(message));
    setMessage(false);
  };

  useEffect(() => {
    if (messages.length && !message) {
      let _timer = setTimeout(() => setMessage(messages[0]), delay * 1000);

      return () => {
        clearTimeout(_timer);
      };
    }
  }, [messages, message]);

  // useEffect(() => {
  //   if (!isLoading && !isConnected) onDialogHandler(true);
  // }, [isConnected, isLoading]);

  return (
    <>
      {/* {isLoading ? <Loading /> : <Navigation />} */}
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
      <Snackbar
        visible={!!message}
        onDismiss={onMessageHide}
        duration={5000}
        action={{
          label: 'Hide',
          onPress: onMessageHide,
        }}>
        {message.message}
      </Snackbar>
    </>
  );
};

export default Layout;
