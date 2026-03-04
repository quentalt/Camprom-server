import express, { Application } from 'express';
import { errorHandler } from './middleware/error.middleware';
import cameraRoutes from './routes/camera.route';
import {corsMiddleware} from "./middleware/cors.middleware";

const app: Application = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Camera API' });
},);
app.use('/api/cameras', cameraRoutes);

// Error handling
app.use(errorHandler);

export default app;