import { ObjectId, Types } from "mongoose";

export type User = {
    _id:ObjectId|null,
    full_name: {
        first_name: String,
        last_name: String
    },
    email: string;
    password: string;
    role: "admin" | "user";
    follows:ObjectId[];
}