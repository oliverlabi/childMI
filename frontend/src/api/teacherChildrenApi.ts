import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    IAllTeacherYearsResponse,
    IChildrenTeachersAndSchoolsBySheetIdResponse,
} from "./apiResponseTypes";
import {API_URL} from "../config/config";

export const teacherChildrenApi = createApi({
    reducerPath: 'teacherChildrenApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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
        getAllTeacherYears: builder.query<any, { teacherId: number }>({
            query(args) {
                const { teacherId } = args;
                return {
                    url: `teacher_children/years/${teacherId}`,
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