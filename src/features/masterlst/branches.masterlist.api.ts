import {baseApi} from "../base";
const BASE_ENDPOINT = "/branches";

const branchMasterlistApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["brancHApi"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchBranches: build.query({
        query: (params) => ({
          url: BASE_ENDPOINT,
          method: "GET",
          params,
        }),
        transformResponse: (response) => {
          console.log("branch fetching");
          return response;
        },
      }),
      postBranch: build.mutation({
        query: (body) => ({
          url: BASE_ENDPOINT,
          method: "POST",
          body,
        }),
      }),
      updateBranch: build.mutation({
        query: (id, ...body) => ({
          url: `${BASE_ENDPOINT}/${id}`,
          method: "PATCH",
          body,
        }),
      }),
      deleteBranch: build.mutation({
        query: (id) => ({
          url: `${BASE_ENDPOINT}/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const {
  useFetchBranchesQuery,
  usePostBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchMasterlistApi;
