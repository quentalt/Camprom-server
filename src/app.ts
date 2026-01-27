import express, { Application } from 'express';
import { corsMiddleware } from './middleware/cors.middleware';
import { errorHandler } from './middleware/error.middleware';
import cameraRoutes from './routes/camera.route';

const app: Application = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Camera API is running' });
});

app.use('/api/cameras', cameraRoutes);

// Error handling
app.use(errorHandler);

export default app;