import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    IAllTeacherYearsResponse,
    IChildrenTeachersAndSchoolsBySheetIdResponse,
} from "./apiResponseTypes";

export const teacherChildrenApi = createApi({
    reducerPath: 'teacherChildrenApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllChildrenTeachersAndSchoolsBySheetId: builder.query<any, { sheetId: number }>({
            query(args) {
                const { sheetId } = args;
                return {
                    url: `teacher_children/${sheetId}`
                }
            },
            transformResponse: (response: { results: { data: IChildrenTeachersAndSchoolsBySheetIdResponse }[]}) =>
                response.results,
        }),
        getAllTeacherYears: builder.query<any, void>({
            query() {
                return {
                    url: `teacher_children/years/`,
                    credentials: "include"
                }
            },
            transformResponse: (response: { results: IAllTeacherYearsResponse}) =>
                response.results,
        }),
    }),
})

export const {
    useGetAllChildrenTeachersAndSchoolsBySheetIdQuery,
    useGetAllTeacherYearsQuery,
} = teacherChildrenApi;