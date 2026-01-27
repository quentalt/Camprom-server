// `src/services/camera.service.ts`
import { Camera, CreateCameraDTO, UpdateCameraDTO, mapDbToCamera, mapCameraToDb } from '../models/camera.model';
import {query} from "../config/database";

export class CameraService {

    async getAllCameras(): Promise<Camera[]> {
        try {
            const result = await query('SELECT * FROM cameras ORDER BY id');
            return result.rows.map(mapDbToCamera);
        } catch (error) {
            console.error('Error fetching cameras:', error);
            throw new Error('Failed to fetch cameras');
        }
    }

    async getCameraById(id: number): Promise<Camera | null> {
        try {
            const result = await query('SELECT * FROM cameras WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return null;
            }
            return mapDbToCamera(result.rows[0]);
        } catch (error) {
            console.error('Error fetching camera by id:', error);
            throw new Error('Failed to fetch camera');
        }
    }

    async getBrands(): Promise<string[]> {
        try {
            const result = await query(
                'SELECT DISTINCT brand FROM cameras ORDER BY brand'
            );
            return result.rows.map(row => row.brand);
        } catch (error) {
            console.error('Error fetching brands:', error);
            throw new Error('Failed to fetch brands');
        }
    }

    async filterCameras(brand?: string, sortBy: string = 'name'): Promise<Camera[]> {
        try {
            let queryText = 'SELECT * FROM cameras';
            const params: any[] = [];

            if (brand) {
                queryText += ' WHERE brand = $1';
                params.push(brand);
            }

            switch (sortBy) {
                case 'price-asc':
                    queryText += ' ORDER BY price ASC';
                    break;
                case 'price-desc':
                    queryText += ' ORDER BY price DESC';
                    break;
                case 'rating':
                    queryText += ' ORDER BY rating DESC';
                    break;
                case 'brand':
                    queryText += ' ORDER BY brand ASC';
                    break;
                default:
                    queryText += ' ORDER BY name ASC';
            }

            const result = await query(queryText, params);
            return result.rows.map(mapDbToCamera);
        } catch (error) {
            console.error('Error filtering cameras:', error);
            throw new Error('Failed to filter cameras');
        }
    }

    async createCamera(cameraData: CreateCameraDTO): Promise<Camera> {
        try {
            const camera = mapCameraToDb(cameraData);
            const result = await query(
                `INSERT INTO cameras (name, brand, price, original_price, discount, rating, image, features, is_on_sale, sale_label, megapixels, type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING *`,
                [
                    camera.name,
                    camera.brand,
                    camera.price,
                    camera.original_price,
                    camera.discount,
                    camera.rating,
                    camera.image,
                    camera.features,
                    camera.is_on_sale,
                    camera.sale_label,
                    camera.megapixels,
                    camera.type
                ]
            );
            return mapDbToCamera(result.rows[0]);
        } catch (error) {
            console.error('Error creating camera:', error);
            throw new Error('Failed to create camera');
        }
    }

    async updateCamera(id: number, cameraData: UpdateCameraDTO): Promise<Camera | null> {
        try {
            const fields: string[] = [];
            const values: any[] = [];
            let paramCount = 1;

            const dbFields: any = {
                name: cameraData.name,
                brand: cameraData.brand,
                price: cameraData.price,
                original_price: cameraData.originalPrice,
                discount: cameraData.discount,
                rating: cameraData.rating,
                image: cameraData.image,
                features: cameraData.features,
                is_on_sale: cameraData.isOnSale,
                sale_label: cameraData.saleLabel,
                megapixels: cameraData.megapixels,
                type: cameraData.type
            };

            Object.entries(dbFields).forEach(([key, value]) => {
                if (value !== undefined) {
                    fields.push(`${key} = $${paramCount}`);
                    values.push(value);
                    paramCount++;
                }
            });

            if (fields.length === 0) {
                return this.getCameraById(id);
            }

            values.push(id);
            const queryText = `
        UPDATE cameras 
        SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $${paramCount}
        RETURNING *
      `;

            const result = await query(queryText, values);
            if (result.rows.length === 0) {
                return null;
            }
            return mapDbToCamera(result.rows[0]);
        } catch (error) {
            console.error('Error updating camera:', error);
            throw new Error('Failed to update camera');
        }
    }

    async deleteCamera(id: number): Promise<boolean> {
        try {
            const result = await query('DELETE FROM cameras WHERE id = $1', [id]);
            return (result.rowCount ?? 0) > 0;
        } catch (error) {
            console.error('Error deleting camera:', error);
            throw new Error('Failed to delete camera');
        }
    }
}