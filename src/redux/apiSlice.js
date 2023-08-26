import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/employees",
    }),
    getRoles: builder.query({
      query: () => "/roles",
    }),
    updateEmployee: builder.mutation({
      query: ({ id, name, role, salary }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: { name, role, salary },
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetRolesQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = apiSlice;

export default apiSlice.reducer;