import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IAllCommentsBySheetIdResponse} from "./apiResponseTypes";
import {API_URL} from "../config/config";

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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