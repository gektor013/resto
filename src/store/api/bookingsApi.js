// import { createApi } from '@reduxjs/toolkit/query/react';
// import { baseQuery } from './config';
// import { formatDateParams } from '../../utils/dates';

// export const bookingsApi = createApi({
//   reducerPath: 'bookingsApi',
//   baseQuery: baseQuery,
//   tagTypes: ['Bookings'],
//   endpoints: builder => ({
//     getTodaysBookedBookingsByStatus: builder.query({
//       query: () => ({
//         url: `/bookings?status=0&date=${formatDateParams(new Date())}}`,
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getTodaysCanceledBookingsByStatus: builder.query({
//       query: () => ({
//         url: `/bookings?status=1&date=${formatDateParams(new Date())}}`,
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getTodaysConfirmedBookingsByStatus: builder.query({
//       query: () => ({
//         url: `/bookings?status=2&date=${formatDateParams(new Date())}}`,
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getTodaysBookedWaitingsByStatus: builder.query({
//       query: () => ({
//         url: `/bookings?status=3&date=${formatDateParams(new Date())}}`,
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getTodayBookedArrivedByStatus: builder.query({
//       query: () => ({
//         url: `/bookings?status=4&date=${formatDateParams(new Date())}}`,
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getTodayBookedDeleteddByStatus: builder.query({
//       query: () => ({
//         url: `/bookings?status=5&date=${formatDateParams(new Date())}}`,
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getBookedBookingsByDate: builder.query({
//       query: date => ({
//         url: `/bookings?status=0&date=${date}}`,
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getCanceledBookingsByDate: builder.query({
//       query: date => ({
//         url: `/bookings?status=1&date=${date}}`,
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getConfirmedBookingsByDate: builder.query({
//       query: date => ({
//         url: `/bookings?status=2&date=${date}}`,
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getWaitingsBookingsByDate: builder.query({
//       query: date => ({
//         url: `/bookings?status=3&date=${date}}`,
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getSelectedBookedBookingsByDate: builder.query({
//       query: date => ({
//         url: `/bookings?status=0&date=${date}}`,
//         method: 'get',
//       }),
//     }),
//     getSelectedCanceledBookingsByDate: builder.query({
//       query: date => ({
//         url: `/bookings?status=1&date=${date}}`,
//         method: 'get',
//       }),
//     }),
//     getSelectedConfirmedBookingsByDate: builder.query({
//       query: date => ({
//         url: `/bookings?status=2&date=${date}}`,
//         method: 'get',
//       }),
//     }),
//     getSelectedWaitingsBookingsByDate: builder.query({
//       query: date => ({
//         url: `/bookings?status=3&date=${date}}`,
//         method: 'get',
//       }),
//     }),
//     getAllBookedBookings: builder.query({
//       query: () => ({
//         url: '/bookings?status=0',
//         method: 'get',
//       }),
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: 'Bookings', id })), 'Bookings']
//           : ['Bookings'],
//     }),
//     getBookingById: builder.query({
//       query: id => ({
//         url: `/bookings/${id}`,
//       }),
//     }),
//     createBooking: builder.mutation({
//       query: body => ({
//         url: '/bookings',
//         method: 'post',
//         body,
//       }),
//       invalidatesTags: ['Bookings'],
//     }),
//     editBooking: builder.mutation({
//       query: body => ({
//         url: `/bookings/${body.id}`,
//         method: 'put',
//         body,
//       }),
//       invalidatesTags: ['Bookings'],
//     }),
//     patchBookings: builder.mutation({
//       query: body => ({
//         url: `/bookings/${body.id}`,
//         method: 'PATCH',
//         body: JSON.stringify(body),
//         headers: {
//           'Content-Type': 'application/merge-patch+json',
//         },
//       }),
//       invalidatesTags: ['Bookings'],
//     }),
//   }),
// });

// export const {
//   useLazyGetTodaysBookedBookingsByStatusQuery,
//   useLazyGetTodaysCanceledBookingsByStatusQuery,
//   useLazyGetTodaysConfirmedBookingsByStatusQuery,
//   useLazyGetTodaysBookedWaitingsByStatusQuery,
//   useLazyGetTodayBookedArrivedByStatusQuery,
//   useLazyGetBookedBookingsByDateQuery,
//   useLazyGetCanceledBookingsByDateQuery,
//   useLazyGetConfirmedBookingsByDateQuery,
//   useLazyGetWaitingsBookingsByDateQuery,
//   useLazyGetSelectedBookedBookingsByDateQuery,
//   useLazyGetSelectedCanceledBookingsByDateQuery,
//   useLazyGetSelectedConfirmedBookingsByDateQuery,
//   useLazyGetSelectedWaitingsBookingsByDateQuery,
//   useLazyGetAllBookedBookingsQuery,
//   useLazyGetBookingByIdQuery,
//   useCreateBookingMutation,
//   useEditBookingMutation,
//   usePatchBookingsMutation,
// } = bookingsApi;
