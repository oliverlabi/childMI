import { configureStore } from "@reduxjs/toolkit";
import { childPropertiesApi } from "../api/childPropertiesApi";
import { schoolApi } from "../api/schoolApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { teacherApi } from "../api/teacherApi";
import { schoolTeachersApi } from "../api/schoolTeachersApi";
import {sheetApi} from "../api/sheetApi";
import {childApi} from "../api/childApi";

export const store = configureStore({
    reducer: {
        [childApi.reducerPath]: childApi.reducer,
        [childPropertiesApi.reducerPath]: childPropertiesApi.reducer,
        [schoolApi.reducerPath]: schoolApi.reducer,
        [teacherApi.reducerPath]: teacherApi.reducer,
        [schoolTeachersApi.reducerPath]: schoolTeachersApi.reducer,
        [sheetApi.reducerPath]: sheetApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            childApi.middleware,
            childPropertiesApi.middleware,
            schoolApi.middleware,
            teacherApi.middleware,
            schoolTeachersApi.middleware,
            sheetApi.middleware
    ]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;