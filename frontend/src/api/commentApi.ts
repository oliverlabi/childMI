import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IAllCommentsBySheetIdResponse} from "./apiResponseTypes";

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllCommentsBySheetId: builder.query<any, { sheetId: number }>({
            query(args) {
                const { sheetId } = args;
                return {
                    url: `comment/${sheetId}`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { commentData: IAllCommentsBySheetIdResponse }}) =>
                results.results,
        }),
    }),
})

export const { useGetAllCommentsBySheetIdQuery } = commentApi