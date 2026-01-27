import dotenv from 'dotenv';
import pool from './config/database';
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
        process.exit(1);
    } else {
        console.log('✅ Database connected at:', res.rows[0].now);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api/cameras`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
});