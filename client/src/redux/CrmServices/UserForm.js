import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USERS_API } from "../../Api";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const UsersFormApi = createApi({
  reducerPath: "UserForm",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["UserForm"],
  endpoints: (builder) => ({
    getUserForm: builder.query({
      query: ({params}) => {
        
        return {
          url: USERS_API,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          params
        };
      },
      providesTags: ["UserForm"],
    })
})
})
export const {
    useGetUserFormQuery

  } = UsersFormApi;
  
  export default UsersFormApi;