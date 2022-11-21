import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IChildPropertyResponse } from "../store/types";

export const childPropertiesApi = createApi({
    reducerPath: 'childApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllChildData: builder.query<any, void>({
            query() {
                return {
                    url: `child_properties/`,
                    credentials: "include"
                }
            },
            transformResponse: (results: { results: { propertyData: IChildPropertyResponse }}) =>
                results.results,
        }),
    }),
})

export const { useGetAllChildDataQuery } = childPropertiesApi