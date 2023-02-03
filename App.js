import React from 'react';
import type { Node } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from './src/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActiveBookingStack from './src/navigation';
// import LoadingScreen from './src/screens/loading';
import { PersistGate } from 'redux-persist/integration/react';

// import Layout from './src/components/layout';
// import LoginScreen from './src/screens/login';
// import { colors } from './src/assets/colors';

const App: () => Node = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <SafeAreaView className="min-h-full bg-black">
          {/* <Layout>
        <LoginScreen />
      </Layout> */}
          <ActiveBookingStack />
        </SafeAreaView>
      </PersistGate>
    </ReduxProvider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     minHeight: '100%',
//     backgroundColor: colors.white,
//   },
// });

export default App;
