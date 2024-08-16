import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, QueryReturnType } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { LoginResponse } from "@/dto/response/auth";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<QueryReturnType<LoginResponse>, string>({
            query: (payload) => ({
                ...endPoint.auth.login(),
                params: {
                    app_id: payload
                }
            })
        })
    })
})

export const {
    useLoginMutation,
} = authApi;