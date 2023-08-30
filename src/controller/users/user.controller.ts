// logic here

import { Request, Response } from "express";

import logger from "../../utils/logger";
import { createUser } from "../../services/users/userhandler.service";
import { TypeOf } from "zod";
import { CreateUserSchema } from "../../schema/users/users.schema";

import { omit } from "lodash";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(res.json(), "password"));
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    } 
}

export type CreateUserInput = Omit<TypeOf<typeof CreateUserSchema>, "body.passwordConfirmation">;


export async function testUserApi(req: Request, res: Response) {
    return res.status(200).send(
        {
            "test": "Success"
        }
    )
}