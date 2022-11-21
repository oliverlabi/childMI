import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITeacherResponse } from "../store/types";

export const teacherApi = createApi({
    reducerPath: 'teacherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllTeacherData: builder.query<any, void>({
            query() {
                return {
                    url: `teacher/`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { teacherData: ITeacherResponse }}) =>
                results.results,
        }),
    }),
})

export const { useGetAllTeacherDataQuery } = teacherApi