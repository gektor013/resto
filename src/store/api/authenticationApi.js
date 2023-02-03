import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './config';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    signinUser: builder.mutation({
      query: body => ({
        url: '/login',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useSigninUserMutation } = authenticationApi;
