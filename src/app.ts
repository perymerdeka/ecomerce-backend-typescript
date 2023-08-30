import express from "express";

import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import ProductRouter from "./routes/product.route";
import CoreRouter from "./routes/core.route";
import userRouter from "./routes/users.route";

const port = config.get<number>("port");

const app = express()

// json parsing
app.use(express.json());

app.use("/api/products", ProductRouter);
app.use("/", CoreRouter)
app.use("/api/users", userRouter)



app.listen(
    port,
    async () => {
        logger.info(`Express Run in Port ${port}`)
        await connect();
    }
);