import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    IAllTeacherDataResponse,
    IAllTeachersByYearResponse,
    ITeacherChildrenResponse,
    ITeacherDataResponse
} from "./apiResponseTypes";

export type ITeachersByYearDict = {
    [year: number]: IAllTeachersByYearResponse[];
}

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
            transformResponse: (response: { results: IAllTeacherDataResponse}) =>
                response.results,
        }),
        getAllTeachersByYear: builder.query<any, { year: number }>({
            query(args) {
                const { year } = args;
                return {
                    url: `teacher/years/${year}`
                }
            },
            transformResponse: (response: { results: { teacherData: IAllTeachersByYearResponse }[]}) => {
                response.results;
                const yearlyTeacherData: ITeachersByYearDict = {};

                response.results.map((data: any) => {
                    if(yearlyTeacherData[data.year] == undefined){
                        yearlyTeacherData[data.year] = [];
                    }

                    yearlyTeacherData[data.year].push(
                        {
                            id: data.id,
                            full_name: data.full_name
                        }
                    )
                })

                return yearlyTeacherData;
            }
        }),
        getTeacherData: builder.query<any, { id: number }>({
            query(args) {
                const { id } = args;
                return {
                    url: `teacher/${id}/`
                }
            },
            transformResponse: (response: { results: { teacherData: ITeacherDataResponse }[]}) =>
                response.results[0],
        }),
        getTeacherChildren: builder.query<any, { id: number }>({
            query(args){
                const { id } = args;
                return {
                    url: `teacher/${id}/children/`
                }
            },
            transformResponse: (response: { results: ITeacherChildrenResponse}) =>
                response.results,
        }),
    }),
})

export const {
    useGetAllTeacherDataQuery,
    useGetAllTeachersByYearQuery,
    useGetTeacherDataQuery,
    useGetTeacherChildrenQuery,
} = teacherApi