import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISchoolResponse } from "../store/types";

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
            transformResponse: (results: { results: { schoolData: ISchoolResponse }}) =>
                results.results,
        }),
    }),
})

export const { useGetAllSchoolDataQuery } = schoolApi