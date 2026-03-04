import express, { Application } from 'express';
import { errorHandler } from './middleware/error.middleware';
import cameraRoutes from './routes/camera.route';
import cors from "cors";

const app: Application = express();

// Middleware
app.use(cors())
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