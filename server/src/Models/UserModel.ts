import mongoose, { Document, Schema, Types } from "mongoose";
import {User} from '../../Types/User'

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