import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ALLOCATION_API, CALLLOG_API } from "../../Api";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const CallLogApi = createApi({
  reducerPath: "CallLog",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["CallLog"],
  endpoints: (builder) => ({
    getCallLog: builder.query({
      query: ({ params }) => {
        return {
          url: ALLOCATION_API,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          params,
        };
      },
      providesTags: ["CallLog"],
    }),
    addCalllog: builder.mutation({
      query: (payload) => ({
        url: CALLLOG_API,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["CallLog"],
    }),
  }),
});

export const {
  useGetCallLogQuery,
  useAddCalllogMutation,
} = CallLogApi;

export default CallLogApi;
