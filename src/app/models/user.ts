import { Roles } from "../enums/role";

export interface User {
    id: string;
    email: string;
    role: Roles;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface LoginUser {
    user: User,
    access_token: string;
}