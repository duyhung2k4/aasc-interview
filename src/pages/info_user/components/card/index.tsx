import React, { useContext } from "react";
import dayjs from "dayjs";

import { EmployeeModel } from "@/models/employee";
import { InfoUserContext, TypeInfoUserContext } from "../..";

import classes from "./styles.module.css";

const CardEmployee: React.FC<EmployeeModel> = (props) => {
    const { employeeSelect, setEmployeeSelect } = useContext<TypeInfoUserContext>(InfoUserContext);

    return (
        <div 
            className={`${classes.root} ${employeeSelect?.ID === props.ID && classes.active}`}
            onClick={() => setEmployeeSelect(props)}
        >
            <div className={classes.info}>
                <p className={classes.name}>{props.LAST_NAME} {props.NAME}</p>
                <p className={classes.work_position}>
                    {props.WORK_POSITION || "Chưa phân chức vụ"}
                </p>
                <p className={classes.date_register}>Ngày đăng kí: {props.DATE_REGISTER ? dayjs(new Date(props.DATE_REGISTER)).format("DD-MM-YYYY") : "Chưa đăng kí"}</p>
            </div>
            <div className={props.IS_ONLINE === "Y" ?  classes.status_online : classes.status_offline}></div>
        </div>
    )
}

export default CardEmployee;