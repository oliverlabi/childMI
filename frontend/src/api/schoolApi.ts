import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IAllSchoolDataResponse} from "./apiResponseTypes";
import {API_URL} from "../config/config";

export const schoolApi = createApi({
    reducerPath: 'schoolApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getAllSchoolData: builder.query<any, void>({
            query() {
                return {
                    url: `school/`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { schoolData: IAllSchoolDataResponse }}) =>
                results.results,
        }),
    }),
})

export const { useGetAllSchoolDataQuery } = schoolApi