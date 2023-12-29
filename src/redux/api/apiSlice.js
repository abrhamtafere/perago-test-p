import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, API_TAGS } from "../../utility/apiTags";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: Object.values(API_TAGS),
  endpoints: (builder) => ({}),
});

// export const {

// } = apiSlice;

export default apiSlice.reducer;