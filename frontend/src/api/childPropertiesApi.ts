import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const childPropertiesApi = createApi({
    reducerPath: 'childApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllChildData: builder.query<any, {sheetId: number}>({
            query(args) {
                const { sheetId } = args;
                return {
                    url: `child_properties/child/${sheetId}`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { propertyData: any }}) =>
                results.results,
        }),
    }),
})

export const { useGetAllChildDataQuery } = childPropertiesApi