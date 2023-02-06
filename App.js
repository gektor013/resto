import React from 'react';
import type { Node } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MD3DarkTheme as DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from './src/components/loading';
import Protector from './src/protector';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  version: 3,
};

const App: () => Node = () => {
  const { colors } = useTheme();
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SafeAreaProvider
          style={{ minHeight: '100%', backgroundColor: colors.onBackground }}>
          <PaperProvider
            theme={theme}
            settings={{ icon: props => <MaterialCommunityIcons {...props} /> }}>
            <Protector />
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;