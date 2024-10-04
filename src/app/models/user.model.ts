import { StatusUserEnum } from "../utils/enums/status_user.enum";
import { UserRolEnum } from "../utils/enums/userrol.enum";

export interface User{
    id: number,
    email: string,
    firstname:string,
    lastname: string,
    age: number,
    password: string,
    status: StatusUserEnum,
    rol: UserRolEnum
   
}