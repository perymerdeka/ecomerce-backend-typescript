import { Request, Response } from "express";
import { validatePassword } from "../../services/users/userhandler.service";
import { createSession } from "../../services/users/session.service";
import { signJWT } from '../../utils/jwt.utils';
import config from 'config';

export async function createSessionHandler(req: Request, res: Response) {
    // validate user's password
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(403).send("Invalid username or Password")
    }
    // create session
    const session = await createSession(user._id, req.get("user-agent") || "")
    
    // create access token
    const accessToken = signJWT(
        {...user, session: await session._id,},
        {
            expiresIn: config.get("accessTokenTTL"),

        },
    );

    // create refresh token

    const refreshToken = signJWT(
        {...user, session: await session._id,},
        {
            expiresIn: config.get("accessTokenTTL"),

        },
    );

    // return refresh and acess token

    return res.send(
        {
            accessToken, refreshToken
        }
    )

}