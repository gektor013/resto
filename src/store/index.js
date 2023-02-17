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
import { tablesApi } from './api/tablesApi';
import { userApi } from './api/usersApi';
import { employeeApi } from './api/employeeApi';


import authenticationReducer from './slice/authenticationSlice';
import bookingsReducer from './slice/bookingsSlice';
import controlSlice from './slice/controlSlice';
import bookingData from './slice/bookingDataSlice';
import roomsSlice from './slice/roomsSlice';
import employeesSlice from './slice/employeesSlice';

const storage = new MMKVLoader().initialize();

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['authentication'],
  whitelist: ['authentication', 'bookings', 'rooms', 'employees'],
  blacklist: ['control'],
};

const reducers = combineReducers({
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [bookingsApi.reducerPath]: bookingsApi.reducer,
  [roomsApi.reducerPath]: roomsApi.reducer,
  [tablesApi.reducerPath]: tablesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer,


  authentication: authenticationReducer,
  bookings: bookingsReducer,
  control: controlSlice,
  rooms: roomsSlice,
  employees: employeesSlice,
  bookingData,
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
      tablesApi.middleware,
      userApi.middleware,
      employeeApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
export const persistor = persistStore(store);
