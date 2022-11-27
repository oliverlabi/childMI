import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ITeacherResponse {
    id: number,
    full_name: string,
    start_year?: number,
    school_name?: string,
    school_id?: number,
}

export type ITeachersByYearDict = {
    [start_year: number]: ITeacherResponse[];
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
            transformResponse: (response: { results: []}) =>
                response.results,
        }),
        getAllTeachersByYear: builder.query<any, { year: number }>({
            query(args) {
                const { year } = args;
                return {
                    url: `teacher/${year}/`
                }
            },
            transformResponse: (response: { results: { teacherData: ITeacherResponse }[]}) => {
                response.results;
                const yearlyTeacherData: ITeachersByYearDict = {};

                response.results.map((data: any) => {
                    if(yearlyTeacherData[data.start_year] == undefined){
                        yearlyTeacherData[data.start_year] = [];
                    }

                    yearlyTeacherData[data.start_year].push(
                        {
                            id: data.id,
                            full_name: data.full_name
                        }
                    )
                })

                return yearlyTeacherData;
            }
        }),
        getTeacherData: builder.query<any, { id: number, year: number }>({
            query(args) {
                const { id, year } = args;
                return {
                    url: `teacher/${year}/${id}/`
                }
            },
            transformResponse: (response: { results: { teacherData: any }[]}) =>
                response.results[0],
        }),
        getTeacherChildren: builder.query<any, { id: number, year: number }>({
            query(args){
                const { id, year } = args;
                return {
                    url: `teacher/${year}/${id}/children/`
                }
            },
            transformResponse: (response: { results: []}) =>
                response.results,
        }),
        getAllTeacherYears: builder.query<any, void>({
            query() {
                return {
                    url: `teacher/years/`,
                    credentials: "include"
                }
            },
            transformResponse: (response: { results: []}) =>
                response.results,
        }),
    }),
})

export const {
    useGetAllTeacherDataQuery,
    useGetAllTeachersByYearQuery,
    useGetTeacherDataQuery,
    useGetTeacherChildrenQuery,
    useGetAllTeacherYearsQuery,
} = teacherApi