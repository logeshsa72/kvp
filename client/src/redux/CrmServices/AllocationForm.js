import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LEAD_MASTER_API,ALLOCATION_API } from "../../Api";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const AllocationFormApi = createApi({
  reducerPath: "AllocationForm",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["AllocationForm"],
  endpoints: (builder) => ({
    getAllocationForm: builder.query({
      query: ({params}) => {
        
        return {
          url: LEAD_MASTER_API,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          params
        };
      },
      providesTags: ["AllocationForm"],
    }),
    getAllocationFormById: builder.query({
      query: (id) => {
        return {
          url: `${LEAD_MASTER_API}/${id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      providesTags: ["AllocationForm"],
    }),
      addAllocationForm: builder.mutation({
      query: (payload) => ({
        url: ALLOCATION_API,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["AllocationForm"],
    }),
    deleteAllocationForm: builder.mutation({
      query: (id) => ({
        url: `${ALLOCATION_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllocationForm"],
    }),
})

})
export const {
    useGetAllocationFormQuery,
    useAddAllocationFormMutation,
    useDeleteAllocationFormMutation,
    useGetAllocationFormByIdQuery,
  } = AllocationFormApi;
  
  export default AllocationFormApi;