import SessionModel from "../../models/users/session.model";


export async function createSession(userID: string, userAgent: string) {
    const session = SessionModel.create(
        {
            user: userID,
            userAgent: userAgent
        }
    );
    return (await session).toJSON();
}