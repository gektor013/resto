import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './config';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: baseQuery,
  tagTypes: ['Employees'],
  refetchOnReconnect: true,
  endpoints: builder => ({
    getAllEmployees: builder.query({
      query: () => ({
        url: `/employees`,
      }),
      providesTags: result =>
        result?.partialGoods
          ? [
            ...result.partialGoods.map(good => ({ type: 'Employees', id: good.id })),
            { type: 'Employees', id: 'LIST' },
            { type: 'Employees', id: 'PARTIAL-EMPLOYEES' },
          ]
          : [
            { type: 'Employees', id: 'LIST' },
            { type: 'Employees', id: 'PARTIAL-EMPLOYEES' },
          ],
    }),
    createEmployee: builder.mutation({
      query: (body) => ({
        url: `/employees`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      invalidatesTags: [{ type: 'Employees', id: 'LIST' }],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Employees', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllEmployeesQuery, useDeleteEmployeeMutation, useCreateEmployeeMutation } = employeeApi;
