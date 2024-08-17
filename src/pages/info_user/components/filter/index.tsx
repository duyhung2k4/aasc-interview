import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/vi';

import { Button, Col, Form, Row } from "react-bootstrap";
import { DEPARTMENT } from "@/models/variable";
import { InfoUserContext, TypeInfoUserContext } from "../..";

import classes from "./styles.module.css";

export const filterDefault: TypeFilter = {
    name: "",
    date_register_start: undefined,
    date_register_end: undefined,
    departments: [],
}

const InfoUserFilter: React.FC = () => {

    const { filter, setFilter } = useContext<TypeInfoUserContext>(InfoUserContext);
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <p>Bộ lọc</p>
                <p className={classes.show} onClick={() => setShow(!show)}>{show ? "Ẩn" : "Hiện"}</p>
            </div>

            <div className={`${classes.content} ${show ? classes.active : classes.un_active}`}>
                <Form>
                    <Row className={classes.option}>
                        <Col>
                            <Form.Label htmlFor="name">Lọc theo tên</Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                value={filter.name}
                                onChange={e => {
                                    setFilter({
                                        ...filter,
                                        name: e.target.value,
                                    })
                                }}
                            />
                        </Col>
                    </Row>

                    <Row className={classes.option}>
                        <Col>
                            <Form.Label htmlFor="date_register_start">Ngày đăng kí (khoảng bắt đầu)</Form.Label>
                            <Form.Control
                                type="date"
                                id="date_register_start"
                                value={filter.date_register_start || ""}
                                onChange={e => {
                                    setFilter({
                                        ...filter,
                                        date_register_start: e.target.value ? dayjs(e.target.value).format("YYYY-MM-DD").toString() : undefined,
                                    })
                                }}
                            />
                        </Col>
                        <Col>
                            <Form.Label htmlFor="date_register_end">Ngày đăng kí (khoảng kết thúc)</Form.Label>
                            <Form.Control
                                type="date"
                                id="date_register_end"
                                value={filter.date_register_end || ""}
                                onChange={e => {
                                    setFilter({
                                        ...filter,
                                        date_register_end: e.target.value ? dayjs(e.target.value).format("YYYY-MM-DD").toString() : undefined,
                                    })
                                }}
                            />
                        </Col>
                    </Row>

                    <Row className={classes.option}>
                        <Col>
                            <p>Phòng ban</p>
                            {
                                Object.keys(DEPARTMENT).map(key => {
                                    const isChecked = filter.departments.includes(Number(key));

                                    return (
                                        <Form.Check
                                            key={key}
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {
                                                let newDepartments: number[] = [];
                                                if (isChecked) {
                                                    newDepartments = filter.departments.filter(d => d !== Number(key));
                                                } else {
                                                    newDepartments = [...filter.departments, Number(key)];
                                                }

                                                setFilter({
                                                    ...filter,
                                                    departments: newDepartments,
                                                })
                                            }}
                                            id={`department_${key}`}
                                            label={DEPARTMENT[Number(key)]}
                                        />
                                    )
                                }
                                )
                            }
                        </Col>
                    </Row>
                </Form>
                <div className={classes.action}>
                    <Button
                        variant="danger"
                        onClick={() => setFilter(filterDefault)}
                    >Xóa bộ lọc</Button>
                </div>
            </div>

        </div>
    )
}

export default InfoUserFilter;

export type TypeFilter = {
    name: string
    date_register_start: string | undefined
    date_register_end: string | undefined
    departments: number[]
}
