import { Roles } from "../enums/role";

export interface User {
    id: string;
    email: string;
    role: Roles;
    firstName: string;
    lastName: string;
    phone: string;
    addres:string;
    imagePath: string;
}

export interface LoginUser {
    user: User,
    access_token: string;
}

export interface RegisterUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
}