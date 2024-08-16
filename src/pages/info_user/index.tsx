import React, { createContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import CardEmployee from "./components/card";

import { TOKEN_TYPE } from "@/models/variable";
import { useGetAllQuery } from "@/redux/api/user";
import { Button, Container, Spinner, Stack } from "react-bootstrap";
import { EmployeeModel } from "@/models/employee";

import classes from "./styles.module.css";
import EmployeeDeltail from "./components/modal";



const InfoUser: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const [employeeSelect, setEmployeeSelect] = useState<EmployeeModel | null>(null);

    const {
        data,
        isFetching,
        refetch,
    } = useGetAllQuery(Cookies.get(TOKEN_TYPE.ACCESS_TOKEN) || "");

    const employees = useMemo(() => {
        return data?.data?.result || [];
    }, [data]);

    useEffect(() => {
        refetch();
    }, []);

    return (
        <InfoUserContext.Provider
            value={{
                employeeSelect,
                show,
                setEmployeeSelect,
                setShow,
            }}
        >
            <div 
                style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#242424",
                    paddingBottom: 16,
                }}
            >
                <Container>
                    <p className={classes.title}>Danh sách người dùng</p>
                    <div className={classes.option}>
                        <Button
                            variant={employeeSelect ? "success" : "secondary"}
                            disabled={!employeeSelect}
                            style={{
                                cursor: !employeeSelect ? "not-allowed" : "pointer"
                            }}
                            onClick={() => setShow(true)}
                        >Chi tiết người dùng</Button>
                        <Button
                            style={{
                                cursor: isFetching ? "not-allowed" : "pointer"
                            }}
                            onClick={() => refetch()}
                        >Làm mới</Button>
                    </div>
                </Container>
            </div>

            <div>
                <Container>
                    {
                        isFetching ?
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <Spinner animation="border" />
                            </div>
                            :
                            <Stack gap={3}>
                                {
                                    employees.map(item =>
                                        <CardEmployee key={item.ID} {...item} />
                                    )
                                }
                            </Stack>
                    }
                </Container>
            </div>

            <EmployeeDeltail />
        </InfoUserContext.Provider>
    )
}

export default InfoUser;

export type TypeInfoUserContext = {
    employeeSelect: EmployeeModel | null
    show: boolean
    setEmployeeSelect: (value: EmployeeModel | null) => void
    setShow: (value: boolean) => void
}

export const InfoUserContext = createContext<TypeInfoUserContext>({
    employeeSelect: null,
    show: false,
    setEmployeeSelect: (_) => { },
    setShow: (_) => { },
})