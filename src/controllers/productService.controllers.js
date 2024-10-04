import { productService } from '../models/productService.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Create a new product/service
export const createProductService = asyncHandler(async (req, res) => {
    const productService = new ProductService(req.body);
    const savedProductService = await productService.save();

    if (!savedProductService) {
        throw new ApiError(500, "Failed to create product/service");
    }

    return res.status(201).json(
        new ApiResponse(201, savedProductService, "Product/Service created successfully")
    );
});

// Get all products/services
export const getProductServices = asyncHandler(async (req, res) => {
    const productServices = await ProductService.find();

    if (!productServices || productServices.length === 0) {
        throw new ApiError(404, "No products/services found");
    }

    return res.status(200).json(
        new ApiResponse(200, productServices, "Products/Services fetched successfully")
    );
});

// Get product/service by ID
export const getProductServiceById = asyncHandler(async (req, res) => {
    const productService = await ProductService.findById(req.params.id);

    if (!productService) {
        throw new ApiError(404, "Product/Service not found");
    }

    return res.status(200).json(
        new ApiResponse(200, productService, "Product/Service fetched successfully")
    );
});

// Update product/service by ID
export const updateProductService = asyncHandler(async (req, res) => {
    const updatedProductService = await ProductService.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedProductService) {
        throw new ApiError(404, "Product/Service not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedProductService, "Product/Service updated successfully")
    );
});

// Delete product/service by ID
export const deleteProductService = asyncHandler(async (req, res) => {
    const deletedProductService = await ProductService.findByIdAndDelete(req.params.id);

    if (!deletedProductService) {
        throw new ApiError(404, "Product/Service not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Product/Service deleted successfully")
    );
});
