import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { childPropertiesApi } from "../api/childPropertiesApi";
import { schoolApi } from "../api/schoolApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { teacherApi } from "../api/teacherApi";

export const store = configureStore({
    reducer: {
        [childPropertiesApi.reducerPath]: childPropertiesApi.reducer,
        [schoolApi.reducerPath]: schoolApi.reducer,
        [teacherApi.reducerPath]: teacherApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            childPropertiesApi.middleware,
            schoolApi.middleware,
            teacherApi.middleware,
    ]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;