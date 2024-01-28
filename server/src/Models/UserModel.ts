import mongoose, { Document, Schema, Types } from "mongoose";

type User = {
    full_name: {
        first_name: String,
        last_name: String
    },
    email: string;
    password: string;
    role: "admin" | "user";
    follows: Types.ObjectId[];
}

type UserDocument = User & Document;

let userSchema = new Schema<UserDocument>({
    full_name: {
        first_name: String,
        last_name: String
    },
    email: String,
    password: String,
    role: {
        type: String, default: "user", enum: ["admin", "user"]
    },
    follows: [{ type: Schema.Types.ObjectId, ref: "users" }]
})

exports.UserModel = mongoose.model("users", userSchema);