import { apiSlice } from "./apiSlice";
// 
// 
export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/",
      providesTags: ["employee"],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, name, role, salary }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: { name, role, salary },
      }),
      invalidatesTags: ["employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApiSlice;
