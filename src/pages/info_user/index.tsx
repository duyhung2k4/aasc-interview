import React, { createContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import CardEmployee from "./components/card";

import { TOKEN_TYPE } from "@/models/variable";
import { useGetAllQuery } from "@/redux/api/user";
import { Button, Container, Spinner, Stack } from "react-bootstrap";
import { EmployeeModel } from "@/models/employee";

import classes from "./styles.module.css";
import EmployeeDeltail from "./components/modal";
import InfoUserFilter, { filterDefault, TypeFilter } from "./components/filter";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ROUTER_APP } from "@/constants/router";

const InfoUser: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const [filter, setFilter] = useState<TypeFilter>(filterDefault);
    const [employeeSelect, setEmployeeSelect] = useState<EmployeeModel | null>(null);

    const navigation = useNavigate();

    const {
        data,
        isFetching,
        refetch,
    } = useGetAllQuery(Cookies.get(TOKEN_TYPE.ACCESS_TOKEN) || "");

    const employees = useMemo(() => {
        let list = data?.data?.result || [];

        list = list.filter(e => {
            const mergeDepartment = [...new Set([...e.UF_DEPARTMENT, ...filter.departments])];
            return e.UF_DEPARTMENT.length === mergeDepartment.length;
        } )

        if(filter.name.length > 0) {
            list = list.filter(e => `${e.LAST_NAME} ${e.NAME}`.toLowerCase().includes(filter.name.toLowerCase()));
        }

        if(filter.date_register_start) {
            list = list.filter(e => {
                const isTrue = dayjs(filter.date_register_start) <= dayjs(dayjs(e.DATE_REGISTER).format("YYYY-MM-DD"));
                return isTrue;
            })
        }
        if(filter.date_register_end) {
            list = list.filter(e => {
                const isTrue = dayjs(filter.date_register_end) >= dayjs(dayjs(e.DATE_REGISTER).format("YYYY-MM-DD"));
                return isTrue;
            })
        }

        return list;
    }, [data, filter]);

    const logout = () => {
        Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
        Cookies.remove(TOKEN_TYPE.APP_ID);
        navigation(ROUTER_APP.LOGIN.href);
    }

    useEffect(() => {
        setEmployeeSelect(null);
        refetch();
    }, []);

    return (
        <InfoUserContext.Provider
            value={{
                employeeSelect,
                show,
                filter,
                setEmployeeSelect,
                setShow,
                setFilter,
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
                    <InfoUserFilter/>
                    <div className={classes.option}>
                        <Button variant="danger" onClick={logout}>Đăng xuất</Button>
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
                            onClick={() => {
                                setEmployeeSelect(null);
                                refetch();
                            }}
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
    filter: TypeFilter
    setEmployeeSelect: (value: EmployeeModel | null) => void
    setShow: (value: boolean) => void
    setFilter: (value: TypeFilter) => void
}

export const InfoUserContext = createContext<TypeInfoUserContext>({
    employeeSelect: null,
    show: false,
    filter: filterDefault,
    setEmployeeSelect: (_) => { },
    setShow: (_) => { },
    setFilter: (_) => {},
})