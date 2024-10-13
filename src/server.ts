import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./services/database";
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

connectToDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is runing om port ${PORT}`);
});
