import { omit } from "lodash";
import UsersModel, { UserInput } from "../../models/users/users.model";

export async function createUser(input: UserInput) {
    try {
        const user = UsersModel.create(input);
        return omit((await user).toJSON(), "password")
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function validatePassword({email, password}: {email: string, password: string}) {
    const user = await UsersModel.findOne({ email });
    if (!user) {
        return false;
        
    }

    const isValid = await user.comparePassword(password)

    if (!isValid) {
        return false;
    }

    return omit(user.toJSON(), "password")
}