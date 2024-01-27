import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LEAD_MASTER_API1 } from "../../Api";

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
          url: LEAD_MASTER_API1,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          params
        };
      },
      providesTags: ["AllocationForm"],
    })
})
})
export const {
    useGetAllocationForm

  } = AllocationFormApi;
  
  export default AllocationFormApi;