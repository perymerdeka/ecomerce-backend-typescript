import { Router } from "express";
import { createUserHandler, testUserApi } from "../controller/users/user.controller";
import validateUserResource from "../middleware/users/validateResource";
import { CreateUserSchema } from "../schema/users/users.schema";
import { createSessionHandler } from "../controller/users/session.controller";
import { createSessionSchema } from "../schema/session/session.schema";

const userRouter: Router = Router();

userRouter.post("/", validateUserResource(CreateUserSchema), createUserHandler)
userRouter.get("/test", testUserApi)
userRouter.post("/sessions", createSessionHandler)

export default userRouter