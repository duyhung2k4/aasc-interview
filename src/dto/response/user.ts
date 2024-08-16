import { EmployeeModel } from "@/models/employee"
import { TimeModel } from "@/models/time"

export type EmployeeResponse = {
    result: EmployeeModel[]
    total: number
    time: TimeModel
}