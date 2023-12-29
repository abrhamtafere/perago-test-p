import {apiSlice} from './apiSlice';


export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => "/roles",
    }),
  })
});

  export const {
    useGetRolesQuery,
  } = roleApiSlice;