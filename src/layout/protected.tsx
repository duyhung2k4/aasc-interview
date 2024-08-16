import { ROUTER_APP } from "@/constants/router";
import { TOKEN_TYPE } from "@/models/variable";
import { useLoginMutation } from "@/redux/api/auth";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

const ProtectedLayout: React.FC = () => {
    const outlet = useOutlet();

    const navigation = useNavigate();

    const [post, { isLoading }] = useLoginMutation();

    useEffect(() => {  
        handleReload();
    }, []);
    
    const handleReload = async () => {
        const app_id = Cookies.get(TOKEN_TYPE.APP_ID);
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
    
        if(!app_id || !token) {
            navigation(ROUTER_APP.LOGIN.href);
            return;
        }

        const result = await post(app_id);
        if("error" in result) {
            Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
            Cookies.remove(TOKEN_TYPE.APP_ID);
            navigation(ROUTER_APP.LOGIN.href);
            return;
        }
    }

    return (
        <>{outlet}</>
    )
}

export default ProtectedLayout;