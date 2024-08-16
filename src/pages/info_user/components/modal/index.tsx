import React, { useContext } from "react";
import dayjs from "dayjs";

import { Button, Modal } from "react-bootstrap";
import { InfoUserContext, TypeInfoUserContext } from "../..";
import { DEPARTMENT } from "@/models/variable";

import classes from "./styles.module.css";



const EmployeeDeltail: React.FC = () => {
    const { 
        show, 
        employeeSelect,
        setShow,
    } = useContext<TypeInfoUserContext>(InfoUserContext);
    
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title>Thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tên: <span className={classes.info}>{employeeSelect?.LAST_NAME} {employeeSelect?.NAME}</span></p>
                    <p>Email: <span className={classes.info}>{employeeSelect?.EMAIL}</span></p>
                    <p>Trạng thái: <span className={classes.info}>{employeeSelect?.IS_ONLINE === "Y" ? "Đang hoạt động" : "Nghỉ"}</span></p>
                    <p>Phòng ban: <span className={classes.info}>{(employeeSelect?.UF_DEPARTMENT || []).map((item) => DEPARTMENT?.[item]).join(", ")}</span></p>
                    <p>Chức vụ: <span className={classes.info}>{employeeSelect?.WORK_POSITION || "Chưa phân chức vụ"}</span></p>
                    <p>Lần cuối đăng nhập: <span className={classes.info}>{employeeSelect?.LAST_LOGIN ? dayjs(new Date(employeeSelect.LAST_LOGIN)).format("DD-MM-YYYY") : "Chưa đăng nhập"}</span></p>
                    <p>Ngày đăng kí: <span className={classes.info}>{employeeSelect?.DATE_REGISTER ? dayjs(new Date(employeeSelect.DATE_REGISTER)).format("DD-MM-YYYY") : "Không rõ"}</span></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EmployeeDeltail;