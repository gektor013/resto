import React, { useState, useEffect } from 'react';
import Navigation from '../navigation';
import Loading from '../components/loading';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';
import { useSelector } from 'react-redux';

const Layout = () => {
  const [visibleDialog, setDialogVisible] = useState(false);
  const { isLoading } = useSelector(state => state.control)
  const { isConnected } = useNetInfo();

  const onDialogHandler = flag => {
    setDialogVisible(flag);
  };

  useEffect(() => {
    if (isConnected === false) onDialogHandler(true);
  }, [isConnected]);

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
    </>
  );
};

export default Layout;
