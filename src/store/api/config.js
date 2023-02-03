import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

export const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authentication.token;
    if (token) headers.set('x-api-token', token);
    headers.set('Accept', 'application/json');
    return headers;
  },
});
