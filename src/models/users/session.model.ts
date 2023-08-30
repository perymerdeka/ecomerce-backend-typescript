import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from 'config';
import { UsersDocument } from "./users.model";
import { type } from "os";


export interface SessionDocument extends mongoose.Document {
    user: UsersDocument['_id'];
    valid: boolean;
    userAgent: string;
    password: string;
    createAt: Date;
    updateAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>
}

export interface UserInput {
    email: string;
    name: string;
    password: string;
  }


const sessionSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
        valid: {type: Boolean, default: true},
        userAgent: {type: String}


    }, {
        timestamps: true
    }
);


// creating model for users with Scgema

sessionSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as unknown as SessionDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false); 
}

const SessionModel = mongoose.model("users", sessionSchema);

export default SessionModel;

