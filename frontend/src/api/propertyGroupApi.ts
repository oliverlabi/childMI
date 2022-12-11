import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IAllPropertiesByGroupsByChildIdResponse} from "./apiResponseTypes";

export const propertyGroupApi = createApi({
    reducerPath: 'propertyGroupApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
    endpoints: (builder) => ({
        getAllPropertiesByGroupsByChildId: builder.query<any, { childId: number }>({
            query(args) {
                const { childId } = args;
                return {
                    url: `property_group/${childId}`
                }
            },
            transformResponse: (response: { results: { data: IAllPropertiesByGroupsByChildIdResponse }[]}) =>
                response.results,
        }),
    }),
})

export const {
    useGetAllPropertiesByGroupsByChildIdQuery
} = propertyGroupApi;