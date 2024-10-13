import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION as string);
        console.log("connected to the mongoDB");

    } catch (error) {
        console.error("Failed to connect to database", error);

    }
};