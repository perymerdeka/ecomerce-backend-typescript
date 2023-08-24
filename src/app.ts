import express from "express";

import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import ProductRouter from "./routes/products";

const port = config.get<number>("port");

const app = express()

app.use("/products", ProductRouter);

app.listen(
    port,
    async () => {
        logger.info(`Express Run in Port ${port}`)
        await connect();
    }
);