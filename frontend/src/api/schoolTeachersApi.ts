import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    ISchoolChildrenByIdResponse,
    ISchoolTeachersByIdResponse,
    ITeacherSchoolsByIdResponse
} from "./apiResponseTypes";
import {API_URL} from "../config/config";

export const schoolTeachersApi = createApi({
    reducerPath: 'schoolTeachersApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getSchoolTeachersById: builder.query<any, { id: number }>({
            query(args) {
                const { id } = args;
                return {
                    url: `school_teachers/teachers/${id}/`
                }
            },
            transformResponse: (response: { results: { schoolData: ISchoolTeachersByIdResponse }[]}) =>
                response.results,
        }),
        getSchoolChildrenById: builder.query<any, { id: number }>({
            query(args) {
                const { id } = args;
                return {
                    url: `school_teachers/children/${id}/`
                }
            },
            transformResponse: (response: { results: { schoolData: ISchoolChildrenByIdResponse }[]}) =>
                response.results,
        }),
        getTeacherSchoolsById: builder.query<any, { id: number }>({
            query(args) {
                const { id } = args;
                return {
                    url: `school_teachers/schools/${id}/`
                }
            },
            transformResponse: (response: { results: { teacherSchoolData: ITeacherSchoolsByIdResponse }[]}) =>
                response.results,
        }),
    }),
})

export const {
    useGetSchoolTeachersByIdQuery,
    useGetSchoolChildrenByIdQuery,
    useGetTeacherSchoolsByIdQuery
} = schoolTeachersApi;