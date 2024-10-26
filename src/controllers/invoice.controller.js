import { Invoice } from '../models/invoice.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Create a new invoice
export const createInvoice = asyncHandler(async (req, res) => {
    const invoice = new Invoice(req.body);
    const savedInvoice = await invoice.save();

    if (!savedInvoice) {
        throw new ApiError(500, "Failed to create invoice");
    }

    return res.status(201).json(
        new ApiResponse(201, savedInvoice, "Invoice created successfully")
    );
});

// Get all invoices
export const getInvoices = asyncHandler(async (req, res) => {
    const invoices = await Invoice.find().populate('userId clientId');

    if (!invoices || invoices.length === 0) {
        throw new ApiError(404, "No invoices found");
    }

    return res.status(200).json(
        new ApiResponse(200, invoices, "Invoices fetched successfully")
    );
});

// Get an invoice by ID
export const getInvoiceById = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id).populate('userId clientId');

    if (!invoice) {
        throw new ApiError(404, "Invoice not found");
    }

    return res.status(200).json(
        new ApiResponse(200, invoice, "Invoice fetched successfully")
    );
});

// Update an invoice by ID
export const updateInvoice = asyncHandler(async (req, res) => {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedInvoice) {
        throw new ApiError(404, "Invoice not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedInvoice, "Invoice updated successfully")
    );
});

// Delete an invoice by ID
export const deleteInvoice = asyncHandler(async (req, res) => {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!deletedInvoice) {
        throw new ApiError(404, "Invoice not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Invoice deleted successfully")
    );
});
