import { Types } from "mongoose";

export type User = {
    full_name: {
        first_name: String,
        last_name: String
    },
    email: string;
    password: string;
    role: "admin" | "user";
    follows: Types.ObjectId[];
}