import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from "@env"

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authentication.token;
    if (token) headers.set('x-api-token', token);
    headers.set('Accept', 'application/json');
    return headers;
  },
});
