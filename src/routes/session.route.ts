import { Router } from "express";
import { createSessionHandler } from "../controller/users/session.controller";
import validateUserResource from "../middleware/users/validateResource";
import { createSessionSchema } from "../schema/session/session.schema";

const sessionRouter: Router = Router();


sessionRouter.post("/sessions", validateUserResource(createSessionSchema), createSessionHandler)

export default sessionRouter;