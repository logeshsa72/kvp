import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const studyFormApi  = createApi({
     reducerPath: "studyFromApi",
     baseQuery: fetchBaseQuery({baseUrl: "https://jsonplaceholder.typicode.com/"}),
     endpoints: (build) =>({
          getData :build.query({
          query: () =>({
               url: "todos",
               method: "GET",
          })
          })
     })
})
export const {usegetDataQuery} = studyFormApi
