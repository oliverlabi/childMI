import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    ISchoolChildrenByIdResponse,
    ISchoolTeachersByIdResponse,
    ITeacherSchoolsByFullNameResponse
} from "./apiResponseTypes";

export const schoolTeachersApi = createApi({
    reducerPath: 'schoolTeachersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
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
        getTeacherSchoolsByFullName: builder.query<any, { fullName: number }>({
            query(args) {
                const { fullName } = args;
                return {
                    url: `school_teachers/schools/${fullName}`
                }
            },
            transformResponse: (response: { results: { teacherSchoolData: ITeacherSchoolsByFullNameResponse }[]}) =>
                response.results,
        }),
    }),
})

export const {
    useGetSchoolTeachersByIdQuery,
    useGetSchoolChildrenByIdQuery,
    useGetTeacherSchoolsByFullNameQuery
} = schoolTeachersApi;