import React, { Suspense } from "react";

import { ROUTER_APP } from "@/constants/router";
import { Route, Routes } from "react-router-dom";
import { PageInfoUser, PageLogin } from "./page";
import ProtectedLayout from "@/layout/protected";



const AppRouter: React.FC = () => {
    return (
        <Suspense fallback={"Loading..."}>
            <Routes>
                <Route element={<ProtectedLayout />}>
                    <Route path={ROUTER_APP.LOGIN.href} element={<PageLogin />} />
                    <Route path={ROUTER_APP.HOME.href} element={<PageInfoUser />} />
                    <Route path={ROUTER_APP.INFO_USER.href} element={<PageInfoUser />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRouter;