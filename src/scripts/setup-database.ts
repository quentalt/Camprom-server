import pool from '../config/database';

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS cameras (
                                           id SERIAL PRIMARY KEY,
                                           name VARCHAR(255) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2),
        discount INTEGER,
        rating DECIMAL(2, 1) NOT NULL,
        image TEXT NOT NULL,
        features TEXT[] NOT NULL,
        is_on_sale BOOLEAN DEFAULT FALSE,
        sale_label VARCHAR(100),
        megapixels DECIMAL(4, 1) NOT NULL,
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

    CREATE INDEX IF NOT EXISTS idx_cameras_brand ON cameras(brand);
    CREATE INDEX IF NOT EXISTS idx_cameras_price ON cameras(price);
    CREATE INDEX IF NOT EXISTS idx_cameras_rating ON cameras(rating);
`;

const insertDataQuery = `
    INSERT INTO cameras (name, brand, price, original_price, discount, rating, image, features, is_on_sale, sale_label, megapixels, type) VALUES
                                                                                                                                              ('EOS R5', 'Canon', 2899.00, 3299.00, 12, 4.8, 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
                                                                                                                                               ARRAY['45MP Full Frame', 'Image Stabilisation', 'Vidéo 8K'], TRUE, 'PROMO -12%', 45.0, 'Hybride'),
                                                                                                                                              ('Z7 II', 'Nikon', 2499.00, 2799.00, 11, 4.6, 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=400',
                                                                                                                                               ARRAY['45.7MP', 'Double processeur', 'Dual CF Express'], TRUE, 'SOLDES -11%', 45.7, 'Hybride'),
                                                                                                                                              ('α7R V', 'Sony', 3299.00, NULL, NULL, 4.9, 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400',
                                                                                                                                               ARRAY['61MP', 'AI Focus', '8K Vidéo'], FALSE, NULL, 61.0, 'Hybride'),
                                                                                                                                              ('X-T5', 'Fujifilm', 1499.00, 1699.00, 12, 4.5, 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?auto=compress&cs=tinysrgb&w=400',
                                                                                                                                               ARRAY['40MP APS-C', 'Stabilisation IBIS', 'Film Simulation'], TRUE, 'FLASH SALE', 40.0, 'Hybride'),
                                                                                                                                              ('EOS R6 Mark II', 'Canon', 2199.00, NULL, NULL, 4.7, 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400',
                                                                                                                                               ARRAY['24.2MP', 'Dual Pixel CMOS AF II', 'Vidéo 6K'], FALSE, NULL, 24.2, 'Hybride'),
                                                                                                                                              ('α7 IV', 'Sony', 1999.00, 2299.00, 13, 4.6, 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=400',
                                                                                                                                               ARRAY['33MP', '4K 60p', '693 points AF'], TRUE, 'MÉGA PROMO', 33.0, 'Hybride'),
                                                                                                                                              ('D850', 'Nikon', 2199.00, 2599.00, 15, 4.4, 'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=400',
                                                                                                                                               ARRAY['45.7MP', 'ISO 25600', '153 points AF'], TRUE, 'DERNIÈRE CHANCE', 45.7, 'Reflex'),
                                                                                                                                              ('X-H2S', 'Fujifilm', 2399.00, NULL, NULL, 4.7, 'https://images.pexels.com/photos/436496/pexels-photo-436496.jpeg?auto=compress&cs=tinysrgb&w=400',
                                                                                                                                               ARRAY['26.1MP X-Trans', '6.2K Vidéo', 'Stacked Sensor'], FALSE, NULL, 26.1, 'Hybride')
        ON CONFLICT DO NOTHING;
`;

async function setupDatabase() {
    try {
        console.log('🔧 Setting up database...');

        // Create table
        await pool.query(createTableQuery);
        console.log('✅ Table created successfully');

        // Insert data
        await pool.query(insertDataQuery);
        console.log('✅ Data inserted successfully');

        console.log('🎉 Database setup complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}

setupDatabase();
