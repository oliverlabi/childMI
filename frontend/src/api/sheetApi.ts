import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IAllSheetsDataResponse} from "./apiResponseTypes";

export const sheetApi = createApi({
    reducerPath: 'sheetApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllSheetsData: builder.query<any, void>({
            query() {
                return {
                    url: `sheets/`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { sheetData: IAllSheetsDataResponse }}) =>
                results.results,
        }),
    }),
})

export const { useGetAllSheetsDataQuery } = sheetApi