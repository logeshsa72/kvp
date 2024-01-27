import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LEAD_API } from "../../Api";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const LeadCategoriesMasterApi = createApi({
  reducerPath: "leadCategoriesMaster",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["LeadCategoriesMaster"],
  endpoints: (builder) => ({
    getLeadCategoriesMaster: builder.query({
      query: ({params, searchParams}) => {
        if(searchParams){
          return {
            url: LEAD_API +"/search/"+searchParams,
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            params
          };
        }
        return {
          url: LEAD_API,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          params
        };
      },
      providesTags: ["LeadCategoriesMaster"],
    }),
    getLeadCategoriesMasterById: builder.query({
      query: (id) => {
        return {
          url: `${LEAD_API}/${id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      providesTags: ["LeadCategoriesMaster"],
    }),
    addLeadCategoriesMaster: builder.mutation({
      query: (payload) => ({
        url: LEAD_API,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["LeadCategoriesMaster"],
    }),
    updateLeadCategoriesMaster: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `${LEAD_API}/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["LeadCategoriesMaster"],
    }),
    deleteLeadCategoriesMaster: builder.mutation({
      query: (id) => ({
        url: `${LEAD_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LeadCategoriesMaster"],
    }),
  }),
});

export const {
  useGetLeadCategoriesMasterQuery,
  useGetLeadCategoriesMasterByIdQuery,
  useAddLeadCategoriesMasterMutation,
  useUpdateLeadCategoriesMasterMutation,
  useDeleteLeadCategoriesMasterMutation,
} = LeadCategoriesMasterApi;

export default LeadCategoriesMasterApi;
