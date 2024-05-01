import vars from "../config/vars";
import mongoose from 'mongoose';
import logger from "../helpers/logger";
export const connectToMongoDB = async () => {
    try {
        const mongoDbUrl = vars.db.mongoDbUri || "mongodb://0.0.0.0:27017/qezy";
        await mongoose.connect(mongoDbUrl);
        logger.info(`[${new Date().toISOString()}] - Connect to ${mongoDbUrl} successfully`);
    } catch (error) {
        logger.error(`[${new Date().toISOString()}] - ${JSON.stringify(error)}`);
    }
};