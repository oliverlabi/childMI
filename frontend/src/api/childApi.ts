import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IAllChildrenDataBySheetResponse, IChildDataBySheetAndIdResponse} from "./apiResponseTypes";

export const childApi = createApi({
    reducerPath: 'childApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllChildrenDataBySheet: builder.query<any, {sheetId: number}>({
            query(args) {
                const { sheetId } = args;
                return {
                    url: `child/${sheetId}/`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { childData: IAllChildrenDataBySheetResponse }}) =>
                results.results,
        }),
        getChildDataBySheetAndId: builder.query<any, {childId: number, sheetId: number}>({
            query(args) {
                const { sheetId, childId } = args;
                return {
                    url: `child/${sheetId}/${childId}`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { childData: IChildDataBySheetAndIdResponse }}) =>
                results.results,
        }),
    }),
})

export const {
    useGetAllChildrenDataBySheetQuery,
    useGetChildDataBySheetAndIdQuery,
} = childApi