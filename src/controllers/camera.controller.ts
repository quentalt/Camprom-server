import { Request, Response } from 'express';
import { CameraService } from '../services/camera.service';

const cameraService = new CameraService();

function parseId(idParam: string | string[] | undefined): number | null {
    if (Array.isArray(idParam)) {
        idParam = idParam[0];
    }
    if (!idParam) return null;
    const id = parseInt(idParam, 10);
    return Number.isNaN(id) ? null : id;
}


function asyncHandler(fn: (req: Request, res: Response) => Promise<void>) {
    return async (req: Request, res: Response) => {
        try {
            await fn(req, res);
        } catch (error) {
            console.error(`Error in ${fn.name}:`, error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

export class CameraController {

    getAllCameras = asyncHandler(async (req, res) => {
        const cameras = await cameraService.getAllCameras();
        res.json(cameras);
    });

    getCameraById = asyncHandler(async (req, res) => {
        const id = parseId(req.params.id);
        if (id === null) { res.status(400).json({ error: 'Invalid camera ID' }); return; }

        const camera = await cameraService.getCameraById(id);
        camera ? res.json(camera) : res.status(404).json({ error: 'Camera not found' });
    });

    getBrands = asyncHandler(async (req, res) => {
        const brands = await cameraService.getBrands();
        res.json(brands);
    });

    filterCameras = asyncHandler(async (req, res) => {
        const brand = typeof req.query.brand === 'string' ? req.query.brand : undefined;
        const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'name';
        const cameras = await cameraService.filterCameras(brand, sortBy);
        res.json(cameras);
    });


    createCamera = asyncHandler(async (req, res) => {
        const camera = await cameraService.createCamera(req.body);
        res.status(201).json(camera);
    });

    updateCamera = asyncHandler(async (req, res) => {
        const id = parseId(req.params.id);
        if (id === null) { res.status(400).json({ error: 'Invalid camera ID' }); return; }

        const camera = await cameraService.updateCamera(id, req.body);
        camera ? res.json(camera) : res.status(404).json({ error: 'Camera not found' });
    });

    deleteCamera = asyncHandler(async (req, res) => {
        const id = parseId(req.params.id);
        if (id === null) { res.status(400).json({ error: 'Invalid camera ID' }); return; }

        const deleted = await cameraService.deleteCamera(id);
        deleted ? res.status(204).send() : res.status(404).json({ error: 'Camera not found' });
    });
}