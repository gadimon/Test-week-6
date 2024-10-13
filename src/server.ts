import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes';
import { connectToDatabase } from "./services/database";
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test week 5',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./src/routes/*.ts'],
};
const openapiSpecification = swaggerJsdoc(options);

app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
connectToDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is runing om port ${PORT}`);
});

