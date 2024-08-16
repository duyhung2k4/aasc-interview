import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { authApi } from "./api/auth";
import { userApi } from "./api/user";

const middleware = [
    authApi.middleware,
    userApi.middleware,
]

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch