import { Router } from 'express';
import { CameraController } from "../controllers/camera.controller";

const router = Router();
const cameraController = new CameraController();

router.get('/meta/brands', (req, res) => cameraController.getBrands(req, res));
router.get('/filter/search', (req, res) => cameraController.filterCameras(req, res));

router.get('/', (req, res) => cameraController.getAllCameras(req, res));
router.get('/:id', (req, res) => cameraController.getCameraById(req, res));
router.post('/', (req, res) => cameraController.createCamera(req, res));
router.put('/:id', (req, res) => cameraController.updateCamera(req, res));
router.delete('/:id', (req, res) => cameraController.deleteCamera(req, res));

export default router;