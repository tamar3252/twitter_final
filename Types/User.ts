import { ObjectId } from "mongoose";

export type FullName = {
    first_name: String,
    last_name: String
}
export enum Roles {
    Admin = "admin",
    User = "user"
}
export type User = {
    _id?: ObjectId,
    full_name: FullName
    email: string;
    password: string;
    role: Roles;
    follows: ObjectId[];
}

export type Signup = { status: number; value: User | string | { token: string, user: User } }
export type Login = { status: number; value: User | string | { token: string, user: User } }
export type GetUserDetails = { status: number; value: User | string }
export type Update = { status: number; value: string }
