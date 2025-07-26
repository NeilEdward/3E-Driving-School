// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// Vite exposes env variables on import.meta.env, but you must prefix them with VITE_ in your .env files.
// Make sure you have VITE_BASE_API defined in your .env.development or .env file.
// For example: VITE_BASE_API="http://localhost:3000/api"

const baseUrl = import.meta.env.VITE_BASE_API;

if (!baseUrl) {
  throw new Error("VITE_BASE_API is not defined in your environment variables.");
}

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: () => ({}),
});
