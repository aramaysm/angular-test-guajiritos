import { StatusUserEnum } from "../utils/enums/status_user.enum";
import { UserRolEnum } from "../utils/enums/userrol.enum";

export interface User{
    id: number,
    name: string,
    username:string,
    status: StatusUserEnum,
    rol: UserRolEnum
}