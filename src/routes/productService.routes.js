import { Router } from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import {
    createProductService,
    getProductServices,
    getProductServiceById,
    updateProductService,
    deleteProductService
} from '../controllers/productService.controllers.js';

const router = Router();

router.route('/').post(verifyJwt, createProductService).get(verifyJwt, getProductServices);
router.route('/:id').get(verifyJwt, getProductServiceById).put(verifyJwt, updateProductService).delete(verifyJwt, deleteProductService);

export default router;
