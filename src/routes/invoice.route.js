import express from 'express';
import {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
} from '../controllers/invoice.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route for creating a new invoice (restricted to authenticated users)
router.post('/', authenticate, createInvoice);

// Route for getting all invoices (restricted to authenticated users)
router.get('/', authenticate, getInvoices);

// Route for getting a single invoice by ID (restricted to authenticated users)
router.get('/:id', authenticate, getInvoiceById);

// Route for updating an invoice by ID (restricted to authenticated users)
router.put('/:id', authenticate, updateInvoice);

// Route for deleting an invoice by ID (restricted to authenticated users)
router.delete('/:id', authenticate, deleteInvoice);

export default router;
