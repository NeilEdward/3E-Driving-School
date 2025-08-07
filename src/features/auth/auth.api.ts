import type {LoginFormData} from "@/types/auth.types";
import {baseApi} from "../base";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginFormData, {body: Required<LoginFormData>}>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body: body,
      }),
    }),
    logout: build.mutation({
      query: (id) => ({
        url: `/logout/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {useLoginMutation, useLogoutMutation} = authApi;
