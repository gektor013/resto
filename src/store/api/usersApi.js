import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './config';


export const userApi = createApi({
  reducerPath: 'userApi',
  refetchOnFocus: true,
  tagTypes: ['Users'],
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Users', id })), 'Users']
          : ['Users']
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      })
    }),

    addUser: builder.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users']
    }),
    putUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Users', id: arg.id }],
    }),

  })
})

export const { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery, useLazyGetUserByIdQuery, usePutUserMutation } = userApi