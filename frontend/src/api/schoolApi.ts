import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolApi = createApi({
    reducerPath: 'schoolApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllSchoolData: builder.query<any, void>({
            query() {
                return {
                    url: `school/`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { schoolData: any }}) =>
                results.results,
        }),
    }),
})

export const { useGetAllSchoolDataQuery } = schoolApi