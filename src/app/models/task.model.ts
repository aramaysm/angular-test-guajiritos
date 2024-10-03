import { StatusTaskEnum } from "../utils/enums/status_task.enum";
import { StatusUserEnum } from "../utils/enums/status_user.enum";
import { User } from "./user.model";

export interface Task {
    id: number,
    name: string,
    description: string,
    status: StatusTaskEnum,
    user_assigned: User,
    date: Date,

}