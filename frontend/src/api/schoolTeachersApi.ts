import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {ISchoolChildrenByIdResponse, ISchoolTeachersByIdResponse} from "./apiResponseTypes";

export const schoolTeachersApi = createApi({
    reducerPath: 'schoolTeachersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getSchoolTeachersById: builder.query<any, { id: number }>({
            query(args) {
                const { id } = args;
                return {
                    url: `school_teachers/teacher/${id}/`
                }
            },
            transformResponse: (response: { results: { schoolData: ISchoolTeachersByIdResponse }[]}) =>
                response.results,
        }),
        getSchoolChildrenById: builder.query<any, { id: number }>({
            query(args) {
                const { id } = args;
                return {
                    url: `school_teachers/child/${id}/`
                }
            },
            transformResponse: (response: { results: { schoolData: ISchoolChildrenByIdResponse }[]}) =>
                response.results,
        }),
    }),
})

export const {
    useGetSchoolTeachersByIdQuery,
    useGetSchoolChildrenByIdQuery
} = schoolTeachersApi;