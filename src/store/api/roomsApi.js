import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './config';

export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  baseQuery: baseQuery,
  tagTypes: ['Rooms'],
  endpoints: builder => ({
    getAllRooms: builder.query({
      query: () => ({
        url: `/rooms`,
      }),
      providesTags: result =>
        result?.partialGoods
          ? [
            ...result.partialGoods.map(good => ({ type: 'Rooms', id: good.id })),
            { type: 'Rooms', id: 'LIST' },
            { type: 'Rooms', id: 'PARTIAL-ROOMS' },
          ]
          : [
            { type: 'Rooms', id: 'LIST' },
            { type: 'Rooms', id: 'PARTIAL-ROOMS' },
          ],
    }),
    createRoom: builder.mutation({
      query: (body) => ({
        url: `/rooms`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      invalidatesTags: [{ type: 'Rooms', id: 'LIST' }],
    }),
    patchRoomData: builder.mutation({
      query: (body) => ({
        url: `/rooms/${body.id}`,
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/merge-patch+json"
        }
      }),
      // invalidatesTags: ['Rooms'],
      invalidatesTags: (result, error, body) => [{ type: 'Rooms', id: 'LIST' }],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Rooms', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllRoomsQuery, useLazyGetAllRoomsQuery, useCreateRoomMutation, usePatchRoomDataMutation, useDeleteRoomMutation } = roomsApi;
