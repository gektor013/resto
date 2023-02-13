import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './config';

export const tablesApi = createApi({
  reducerPath: 'tablesApi',
  baseQuery: baseQuery,
  tagTypes: ['Tables'],
  refetchOnFocus: true,
  endpoints: builder => ({
    getAllTables: builder.query({
      query: () => ({
        url: `/tables`,
      }),
      providesTags: result =>
        result?.partialGoods
          ? [
            ...result.partialGoods.map(good => ({ type: 'Tables', id: good.id })),
            { type: 'Tables', id: 'LIST' },
            { type: 'Tables', id: 'PARTIAL-TABLES' },
          ]
          : [
            { type: 'Tables', id: 'LIST' },
            { type: 'Tables', id: 'PARTIAL-TABLES' },
          ],
    }),
    createTable: builder.mutation({
      query: (body) => ({
        url: `/tables`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      invalidatesTags: [{ type: 'Tables', id: 'LIST' }],
    })
  }),
});

export const { useGetAllTablesQuery, useCreateTableMutation } = tablesApi;
