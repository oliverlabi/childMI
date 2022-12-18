import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IAllSheetsDataResponse} from "./apiResponseTypes";
import {API_URL} from "../config/config";

export const sheetApi = createApi({
    reducerPath: 'sheetApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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