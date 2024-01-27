import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LEAD_MASTER_API } from "../../Api";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const LeadImportFormApi = createApi({
  reducerPath: "leadImportForm",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["LeadImportForm"],
  endpoints: (builder) => ({
    getLeadImportForm: builder.query({
      query: ({ params, searchParams }) => {
        if (searchParams) {
          return {
            url: LEAD_MASTER_API + "/search/" + searchParams,
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            params
          };
        }
        return {
          url: LEAD_MASTER_API,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          params
        };
      },
      providesTags: ["LeadImportForm"],
    }),
    getLeadImportFormById: builder.query({
      query: (id) => {
        return {
          url: `${LEAD_MASTER_API}/${id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      providesTags: ["LeadImportForm"],
    }),
    importLead: builder.mutation({
      query: (payload) => ({
        url: LEAD_MASTER_API + "/importLead",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["LeadImportForm"],
    }),
    addLeadImportForm: builder.mutation({
      query: (payload) => ({
        url: LEAD_MASTER_API,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["LeadImportForm"],
    }),
    updateLeadImportForm: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `${LEAD_MASTER_API}/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["LeadImportForm"],
    }),
    deleteLeadImportForm: builder.mutation({
      query: (id) => ({
        url: `${LEAD_MASTER_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LeadImportForm"],
    }),
  }),
});

export const {
  useGetLeadImportFormQuery,
  useGetLeadImportFormByIdQuery,
  useImportLeadMutation,
  useAddLeadImportFormMutation,
  useUpdateLeadImportFormMutation,
  useDeleteLeadImportFormMutation,
} = LeadImportFormApi;

export default LeadImportFormApi;
