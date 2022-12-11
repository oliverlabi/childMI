import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    IChildrenTeachersAndSchoolsBySheetIdResponse,
} from "./apiResponseTypes";

export const teacherChildrenApi = createApi({
    reducerPath: 'teacherChildrenApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllChildrenTeachersAndSchoolsBySheetId: builder.query<any, { id: number }>({
            query(args) {
                const { id } = args;
                return {
                    url: `teacher_children/${id}/`
                }
            },
            transformResponse: (response: { results: { data: IChildrenTeachersAndSchoolsBySheetIdResponse }[]}) =>
                response.results,
        }),
    }),
})

export const {
    useGetAllChildrenTeachersAndSchoolsBySheetIdQuery
} = teacherChildrenApi;