import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => '/employees',
    }),
    getRoles: builder.query({
      query: () => '/roles',
    }),
    updateEmployee: builder.mutation({
      query: ({ id, name }) => ({
        url: `/employees/${id}`,
        method: 'PUT',
        body: { name },
      }),
    }),
  }),
});

export const { useGetEmployeesQuery, useGetRolesQuery, useUpdateEmployeeMutation } = apiSlice; 

export default apiSlice.reducer