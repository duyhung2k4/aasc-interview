import Cookies from "js-cookie";

import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_TYPE } from "@/models/variable";
import { authApi } from "../api/auth";



interface AuthState {
    token: string
}

const initialState: AuthState = {
    token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            const data = payload.data;
            if(!data) return;
            state.token = data.token;
            Cookies.set(TOKEN_TYPE.ACCESS_TOKEN, data.token, { expires: 1 });
        })

        builder.addMatcher(authApi.endpoints.login.matchRejected, (state, _) => {
            state.token = "";
            Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
        })
    }
})

export default authSlice;