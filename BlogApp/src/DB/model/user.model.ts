import { Schema, model } from "mongoose";
import { Roles } from "../../src/modules/user/user.dto";

interface IUser {
    username: string;
    email: string;
    password?: string;
    phone?: string;
    address?: string;
    role: Roles;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.User
    }
}, {
    timestamps: true
});

const UserModel = model<IUser>('User', userSchema);
export default UserModel;