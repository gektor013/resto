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
    }),
    getTableById: builder.query({
      query: (id) => ({
        url: `/tables/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Tables', id }],
    }),
    patchTableData: builder.mutation({
      query: (body) => ({
        url: `/tables/${body.id}`,
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/merge-patch+json"
        }
      }),
      invalidatesTags: ['Tables'],
    }),
    deleteTable: builder.mutation({
      query: (id) => ({
        url: `/tables/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tables', id: 'PARTIAL-TABLES' }],
    }),
  }),
});

export const { useGetAllTablesQuery, useCreateTableMutation, useGetTableByIdQuery, usePatchTableDataMutation, useDeleteTableMutation } = tablesApi;
