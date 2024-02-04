import mongoose, { Document, Schema, Types } from "mongoose";
import { Roles, User, FullName } from '../../../Types/User'

const fullNameSchema = new Schema<FullName>({
    first_name: String,
    last_name: String
});


type UserDocument = User & Document;

const userSchema = new Schema<UserDocument>({
    full_name: fullNameSchema,
    email: String,
    password: String,
    role: { type: String, enum: Object.values(Roles), default: Roles.User },
    follows: [{ type: Schema.Types.ObjectId, ref: "users" }]
})



export const UserModel = mongoose.model<UserDocument>("users", userSchema);
// exports.UserModel = mongoose.model("users", userSchema);