import axios from "axios"
import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import type { AxiosRequestConfig, AxiosError } from "axios"


export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: import.meta.env.VITE_SERVER_URL }
    ): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig["method"]
            data?: AxiosRequestConfig["data"]
            params?: AxiosRequestConfig["params"]
            headers?: AxiosRequestConfig["headers"]
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers }) => {
            try {
                const result = await axios({
                    url: `${baseUrl}/${url}`,
                    method,
                    data,
                    params,
                    headers,
                })
                return { data: result.data }
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }

export type MetaData = {
    page: number
    pageSize: number
    total: number
}

export type QueryReturnType<T = unknown, E = unknown> = {
    data?: undefined;
    error: E;
    success: boolean
    metaData: MetaData;
} | {
    data: T;
    error?: undefined;
    success: boolean
    metaData: MetaData;
};