import mongoose from "mongoose";
import config from "config";
import logger from "./logger";


async function connect(): Promise<void> {
    const dbUri: string = config.get<string>("dbUri")

    try {
        await  mongoose.connect(dbUri).then(
            () => {
                logger.info("Connected to DB")
            }
        )
    } catch (error) {
        logger.error("Could Connect to DB")
        logger.error(error)
        process.exit(1)
    }
}

export default connect