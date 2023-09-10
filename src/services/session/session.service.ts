import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../../models/session/session.model";


export async function createSession(userID: string, userAgent: string) {
    const session = SessionModel.create(
        {
            user: userID,
            userAgent: userAgent
        }
    );
    return (await session).toJSON();
}

export async function findSession(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}