import { Router } from 'express';
import {CameraController} from "../controllers/camera.controller";

const router = Router();
const cameraController = new CameraController();

// GET all cameras
router.get('/', (req, res) => cameraController.getAllCameras(req, res));

// GET camera by ID
router.get('/:id', (req, res) => cameraController.getCameraById(req, res));

// GET all brands
router.get('/meta/brands', (req, res) => cameraController.getBrands(req, res));

// GET filtered cameras
router.get('/filter/search', (req, res) => cameraController.filterCameras(req, res));

// POST create camera
router.post('/', (req, res) => cameraController.createCamera(req, res));

// PUT update camera
router.put('/:id', (req, res) => cameraController.updateCamera(req, res));

// DELETE camera
router.delete('/:id', (req, res) => cameraController.deleteCamera(req, res));

export default router;