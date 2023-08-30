import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from 'config';


export interface UsersDocument extends mongoose.Document {
    email: string;
    name: string;
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


const userShema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: {type: String, required: true},

    }, {
        timestamps: true
    }
);

// presave configuration
userShema.pre("save", async function (next:(err?: Error) => void) {
    // validasi
    let user = this as unknown as UsersDocument

    if (!user.isModified("password")) {
        return next();
    }

    //  encryption process
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);

    // hashing user password
    user.password = hash;

    return next();

});

// creating model for users with Scgema

userShema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as unknown as UsersDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false); 
}

const UsersModel = mongoose.model<UsersDocument>("users", userShema);

export default UsersModel;

