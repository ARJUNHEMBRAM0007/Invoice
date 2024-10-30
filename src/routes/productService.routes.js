import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
    createProductService,
    getProductServices,
    getProductServiceById,
    updateProductService,
    deleteProductService
} from '../controllers/productService.controllers.js';

const router = Router();

router.route('/').post(protect, createProductService).get(protect, getProductServices);
router.route('/:id').get(protect, getProductServiceById).put(protect, updateProductService).delete(protect, deleteProductService);

export default router;
