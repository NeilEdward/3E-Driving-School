import {baseApi} from "../../base";
import type {Branch} from "@/types/branch.types"; // adjust path as needed

const BASE_ENDPOINT = "/branches";

// Example: Define the expected response type for fetchBranches
type FetchBranchesResponse = Branch[]; // or whatever the API returns
type FetchBranchesParams = {status?: string; page?: number};

const branchMasterlistApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["brancHApi"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchBranches: build.query<FetchBranchesResponse, FetchBranchesParams>({
        query: (params) => ({
          url: BASE_ENDPOINT,
          method: "GET",
          params,
        }),
        transformResponse: (response: unknown) => {
          // Type assertion example:
          console.log("branch fetching");
          return response as FetchBranchesResponse;
        },
      }),
      postBranch: build.mutation<Branch, Partial<Branch>>({
        query: (body) => ({
          url: BASE_ENDPOINT,
          method: "POST",
          body,
        }),
      }),
      updateBranch: build.mutation<Branch, {id: string; body: Partial<Branch>}>({
        query: ({id, body}) => ({
          url: `${BASE_ENDPOINT}/${id}`,
          method: "PATCH",
          body,
        }),
      }),
      deleteBranch: build.mutation<{success: boolean}, string>({
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
