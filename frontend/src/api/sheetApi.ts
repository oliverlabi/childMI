import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IAllSheetsDataByTypeResponse, IAllSheetsDataResponse} from "./apiResponseTypes";
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
        getAllSheetsDataByType: builder.query<any, { type: number }>({
            query(args) {
                const { type } = args;
                return {
                    url: `sheets/${type}`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { sheetData: IAllSheetsDataByTypeResponse }}) =>
                results.results,
        }),
        getFirstSheetWithDifferentType: builder.query<any, { type: number }>({
            query(args) {
                const { type } = args;
                return {
                    url: `sheets/${type}/first`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { sheetData: IAllSheetsDataByTypeResponse }}) =>
                results.results,
        }),
    }),
})

export const {
    useGetAllSheetsDataQuery,
    useGetAllSheetsDataByTypeQuery,
    useGetFirstSheetWithDifferentTypeQuery,
} = sheetApi