import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './config';

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: baseQuery,
  tagTypes: ['Bookings', 'TodayBookings', 'BookingDates', 'BookingByPeriod'],
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: builder => ({
    getAllBookingByParams: builder.query({
      query: (query) => ({
        url: `/bookings${query}`,
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
      forceRefetch: true
    }),
    getBookingsByPeriod: builder.query({
      query: () => ({
        url: '/bookings/period',
      }),
      providesTags: ['BookingByPeriod'],
      forceRefetch: true
    }),
    getBookingsDates: builder.query({
      query: () => ({
        url: '/bookings/upcoming-dates'
      }),
      providesTags: ['BookingDates']
    }),

    getTodayBookingByParams: builder.query({
      query: (query) => ({
        url: `/bookings${query}`,
      }),
      providesTags: ['TodayBookings'],
    }),
    getBookingById: builder.query({
      query: id => ({
        url: `/bookings/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Bookings', id }],
    }),
    createBooking: builder.mutation({
      query: body => ({
        url: '/bookings',
        method: 'post',
        body,
      }),
      invalidatesTags: [{ type: 'Bookings', id: 'LIST' }, { type: 'TodayBookings' }, { type: 'BookingDates' }, { type: 'BookingByPeriod' }],
    }),
    editBooking: builder.mutation({
      query: body => ({
        url: `/bookings/${body.id}`,
        method: 'put',
        body,
      }),
      invalidatesTags: [{ type: 'Bookings', id: 'LIST' }, { type: 'TodayBookings' }, { type: 'BookingDates' }],
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
      invalidatesTags: (result, error, body) => [{ type: 'Bookings', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllBookingByParamsQuery, useGetBookingsDatesQuery, useGetBookingsByPeriodQuery, useGetTodayBookingByParamsQuery, useCreateBookingMutation, useEditBookingMutation, usePatchBookingsMutation } = bookingsApi;
