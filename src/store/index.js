import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { MMKVLoader } from "react-native-mmkv-storage";

import { unauthenticatedMiddleware } from './middlewares/unauthenticated';
import { authenticationApi } from './api/authenticationApi';
import { bookingsApi } from './api/bookingsApi';
import { roomsApi } from './api/roomsApi';
import authenticationReducer from './slice/authenticationSlice';
import bookingsReducer from './slice/bookingsSlice';
import controlSlice from './slice/controlSlice';
import bookingData from './slice/bookingDataSlice';

// import messagesSlice from './slice/messagesSlice';

const storage = new MMKVLoader().initialize();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authentication', 'bookings'],
  // whitelist: ['authentication', 'bookings'],
  blacklist: ['control'],
};

const reducers = combineReducers({
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [bookingsApi.reducerPath]: bookingsApi.reducer,
  [roomsApi.reducerPath]: roomsApi.reducer,
  authentication: authenticationReducer,
  bookings: bookingsReducer,
  control: controlSlice,
  bookingData,
  // messages: messagesSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      unauthenticatedMiddleware,
      authenticationApi.middleware,
      bookingsApi.middleware,
      roomsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
export const persistor = persistStore(store);
