
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HEADING_API } from "../../Api";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const HeadingCategoriesMasterApi = createApi({
  reducerPath: "headingCategoriesMaster",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["HeadingCategoriesMaster"],
  endpoints: (builder) => ({
    getHeadingCategoriesMaster: builder.query({
      query: ({params}) => {
        
        return {
          url: HEADING_API,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          params
        };
      },
      providesTags: ["HeadingCategoriesMaster"],
    }),
    getHeadingCategoriesMasterById: builder.query({
      query: (id) => {
        return {
          url: `${HEADING_API}/${id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      providesTags: ["HeadingCategoriesMaster"],
    }),
    addHeadingCategoriesMaster: builder.mutation({
      query: (payload) => ({
        url: HEADING_API,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["HeadingCategoriesMaster"],
    }),
    updateHeadingCategoriesMaster: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `${HEADING_API}/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["HeadingCategoriesMaster"],
    }),
    deleteHeadingCategoriesMaster: builder.mutation({
      query: (id) => ({
        url: `${HEADING_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HeadingCategoriesMaster"],
    }),
  }),
});

export const {
  useGetHeadingCategoriesMasterQuery,
  useGetHeadingCategoriesMasterByIdQuery,
  useAddHeadingCategoriesMasterMutation,
  useUpdateHeadingCategoriesMasterMutation,
  useDeleteHeadingCategoriesMasterMutation,
} = HeadingCategoriesMasterApi;

export default HeadingCategoriesMasterApi;
