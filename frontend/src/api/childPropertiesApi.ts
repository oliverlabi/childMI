import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    IAllChildPropertiesBySheetIdAndChildIdResponse,
    IAllChildrenPropertiesDataBySheetResponse,
    IAllPropertiesBySheetResponse
} from "./apiResponseTypes";

export const childPropertiesApi = createApi({
    reducerPath: 'childPropertiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllChildrenPropertiesDataBySheet: builder.query<any, {sheetId: number}>({
            query(args) {
                const { sheetId } = args;
                return {
                    url: `child_properties/child/${sheetId}`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { propertyData: IAllChildrenPropertiesDataBySheetResponse }}) =>
                results.results,
        }),
        getAllPropertiesBySheet: builder.query<any, {sheetId: number}>({
            query(args) {
                const { sheetId } = args;
                return {
                    url: `child_properties/properties/${sheetId}`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { propertyData: IAllPropertiesBySheetResponse }}) =>
                results.results,
        }),
        getAllChildPropertiesBySheetIdAndChildId: builder.query<any, {sheetId: number, childId: number}>({
            query(args) {
                const { sheetId, childId } = args;
                return {
                    url: `child_properties/properties/${sheetId}/${childId}`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { propertyData: IAllChildPropertiesBySheetIdAndChildIdResponse }}) =>
                results.results,
        }),
    }),
})

export const {
    useGetAllChildrenPropertiesDataBySheetQuery,
    useGetAllPropertiesBySheetQuery,
    useGetAllChildPropertiesBySheetIdAndChildIdQuery
} = childPropertiesApi