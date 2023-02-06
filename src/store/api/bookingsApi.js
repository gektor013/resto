import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './config';
// import { formatDateParams } from '../../utils/dates';

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: baseQuery,
  tagTypes: ['Bookings'],
  endpoints: builder => ({
    getAllBookingByQuery: builder.query({
      query: (query) => ({
        url: `/bookings`,
        params: {

        }
      }),
      providesTags: result =>
        result?.partialGoods
          ? [
            ...result.partialGoods.map(good => ({ type: 'Bookings', id: good.id })),
            { type: 'Bookings', id: 'LIST' },
            { type: 'Bookings', id: 'PARTIAL-BOOKINGS' },
          ]
          : [
            { type: 'Bookings', id: 'LIST' },
            { type: 'Bookings', id: 'PARTIAL-BOOKINGS' },
          ],
    }),
    getBookingById: builder.query({
      query: id => ({
        url: `/bookings/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Goods', id }],
    }),
    createBooking: builder.mutation({
      query: body => ({
        url: '/bookings',
        method: 'post',
        body,
      }),
      invalidatesTags: [{ type: 'Goods', id: 'LIST' }],
    }),
    editBooking: builder.mutation({
      query: body => ({
        url: `/bookings/${body.id}`,
        method: 'put',
        body,
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Goods', id: body.id }],
    }),
    patchBookings: builder.mutation({
      query: body => ({
        url: `/bookings/${body.id}`,
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Goods', id: body.id }],
    }),
  }),
});

export const { } = bookingsApi;
