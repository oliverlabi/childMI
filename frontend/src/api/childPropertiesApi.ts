import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const childPropertiesApi = createApi({
    reducerPath: 'childApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllChildrenDataBySheet: builder.query<any, {sheetId: number}>({
            query(args) {
                const { sheetId } = args;
                return {
                    url: `child_properties/child/${sheetId}`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { propertyData: IAllChildrenDataBySheetResponse }}) =>
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
    }),
})

export const {
    useGetAllChildrenDataBySheetQuery,
    useGetAllPropertiesBySheetQuery
} = childPropertiesApi