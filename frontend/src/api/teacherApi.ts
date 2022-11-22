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
        getTeacherData: builder.query<any, number>({
            query(id) {
                return {
                    url: `teacher/${id}`
                }
            },
            transformResponse: (results: { results: { teacherData: ITeacherResponse }[]}) =>
                results.results[0],
        }),
        getTeacherChildren: builder.query<any, number>({
            query(id){
                return {
                    url: `teacher/${id}/children`
                }
            },
            transformResponse: (results: { results: { teacherData: ITeacherResponse }}) =>
                results.results,
        })
    }),
})

export const {
    useGetAllTeacherDataQuery,
    useGetTeacherDataQuery,
    useGetTeacherChildrenQuery
} = teacherApi