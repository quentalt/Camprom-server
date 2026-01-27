import { Request, Response } from 'express';
import { CameraService } from '../services/camera.service';

const cameraService = new CameraService();

export class CameraController {

    async getAllCameras(req: Request, res: Response): Promise<void> {
        try {
            const cameras = await cameraService.getAllCameras();
            res.json(cameras);
        } catch (error) {
            console.error('Error in getAllCameras:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getCameraById(req: Request, res: Response): Promise<void> {
        try {
            const idParam = req.params.id;

            if (!idParam || Array.isArray(idParam)) {
                res.status(400).json({ error: 'Invalid camera ID' });
                return;
            }

            const id = parseInt(idParam, 10);

            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid camera ID' });
                return;
            }

            const camera = await cameraService.getCameraById(id);

            if (camera) {
                res.json(camera);
            } else {
                res.status(404).json({ error: 'Camera not found' });
            }
        } catch (error) {
            console.error('Error in getCameraById:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getBrands(req: Request, res: Response): Promise<void> {
        try {
            const brands = await cameraService.getBrands();
            res.json(brands);
        } catch (error) {
            console.error('Error in getBrands:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async filterCameras(req: Request, res: Response): Promise<void> {
        try {
            const { brand, sortBy } = req.query;
            const cameras = await cameraService.filterCameras(
                brand as string | undefined,
                sortBy as string | undefined
            );
            res.json(cameras);
        } catch (error) {
            console.error('Error in filterCameras:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createCamera(req: Request, res: Response): Promise<void> {
        try {
            const camera = await cameraService.createCamera(req.body);
            res.status(201).json(camera);
        } catch (error) {
            console.error('Error in createCamera:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateCamera(req: Request, res: Response): Promise<void> {
        try {
            const idParam = req.params.id;

            if (!idParam || Array.isArray(idParam)) {
                res.status(400).json({ error: 'Invalid camera ID' });
                return;
            }

            const id = parseInt(idParam, 10);

            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid camera ID' });
                return;
            }

            const camera = await cameraService.updateCamera(id, req.body);

            if (camera) {
                res.json(camera);
            } else {
                res.status(404).json({ error: 'Camera not found' });
            }
        } catch (error) {
            console.error('Error in updateCamera:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteCamera(req: Request, res: Response): Promise<void> {
        try {
            const idParam = req.params.id;

            if (!idParam || Array.isArray(idParam)) {
                res.status(400).json({ error: 'Invalid camera ID' });
                return;
            }

            const id = parseInt(idParam, 10);

            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid camera ID' });
                return;
            }

            const deleted = await cameraService.deleteCamera(id);

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Camera not found' });
            }
        } catch (error) {
            console.error('Error in deleteCamera:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}