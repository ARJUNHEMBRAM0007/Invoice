import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Client } from '../models/client.model.js';

// Create a new client
export const createClient = asyncHandler(async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    
    if (!client) {
      throw new ApiError(500, "Failed to create client");
    }

    return res.status(201).json(new ApiResponse(201, client, "Client created successfully"));
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ApiError(400, `Validation error: ${error.message}`);
    }
    throw new ApiError(500, `Server error: ${error.message}`);
  }
});

// Get all clients
export const getClients = asyncHandler(async (req, res) => {
  try {
    const clients = await Client.find();
    
    if (!clients || clients.length === 0) {
      throw new ApiError(404, "No clients found");
    }

    return res.status(200).json(new ApiResponse(200, clients, "Clients retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, `Server error: ${error.message}`);
  }
});

// Get client by ID
export const getClientById = asyncHandler(async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      throw new ApiError(404, "Client not found");
    }

    return res.status(200).json(new ApiResponse(200, client, "Client retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, `Server error: ${error.message}`);
  }
});

// Update client by ID
export const updateClient = asyncHandler(async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!client) {
      throw new ApiError(404, "Client not found");
    }

    return res.status(200).json(new ApiResponse(200, client, "Client updated successfully"));
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ApiError(400, `Validation error: ${error.message}`);
    }
    throw new ApiError(500, `Server error: ${error.message}`);
  }
});

// Delete client by ID
export const deleteClient = asyncHandler(async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    
    if (!client) {
      throw new ApiError(404, "Client not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Client deleted successfully"));
  } catch (error) {
    throw new ApiError(500, `Server error: ${error.message}`);
  }
});
