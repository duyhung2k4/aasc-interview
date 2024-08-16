import React, { useState } from "react";
import Cookies from "js-cookie";

import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useLoginMutation } from "@/redux/api/auth";
import { useNavigate } from "react-router-dom";
import { ROUTER_APP } from "@/constants/router";
import { TOKEN_TYPE } from "@/models/variable";

import classes from "./styles.module.css";



const Login: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const [appId, setAppId] = useState<string>("");

    const navigation = useNavigate();

    const [post, { isLoading }] = useLoginMutation();

    const handleLogin = async () => {
        if (appId.length === 0) return;
        const result = await post(appId);

        if ("error" in result) {
            return;
        }

        Cookies.set(TOKEN_TYPE.APP_ID, appId);
        navigation(ROUTER_APP.INFO_USER.href);
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.box}>
                    <p className={classes.title__login}>Đăng nhập</p>
                    <p className={classes.title__welcome}>Chào mừng bạn quay lại</p>
                    <p>
                        Sử dụng&nbsp;
                        <span onClick={() => setShow(true)} className={classes.high__light}>App ID</span>
                        &nbsp;của bạn để đăng nhập
                    </p>

                    <Form.Label htmlFor="form_app_id">App ID</Form.Label>
                    <Form.Control
                        type="text"
                        id="form_app_id"
                        value={appId}
                        onChange={e => setAppId(e.target.value)}
                    />

                    <Button
                        className={classes.btn__login}
                        style={{
                            cursor: isLoading ? "not-allowed" : "pointer"
                        }}
                        onClick={handleLogin}
                    >
                        {isLoading ? <Spinner size="sm" style={{ fontSize: 12 }} animation="border" /> : "Đăng nhập"}
                    </Button>
                </div>
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title>Thông tin thêm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Dùng App ID được cung cấp trong file Readme.md trong github</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Đã hiểu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login;