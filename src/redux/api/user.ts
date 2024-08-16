import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, QueryReturnType } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { EmployeeResponse } from "@/dto/response/user";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getAll: builder.query<QueryReturnType<EmployeeResponse>, string>({
            query: (payload) => ({
                ...endPoint.users.getAll(),
                params: {
                    token: payload
                }
            })
        })
    })
})

export const {
    useGetAllQuery,
} = userApi;