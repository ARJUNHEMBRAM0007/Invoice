import { Router } from 'express';
import { createClient, getClients, getClientById, updateClient, deleteClient } from '../controllers/client.controller.js';
import { protect } from "../middlewares/auth.middleware.js"; // Assuming this middleware secures the routes

const router = Router();

// Create a new client (secured route)
router.route('/').post(protect, createClient);

// Get all clients
router.route('/').get(getClients);

// Get, Update, and Delete a client by ID (secured routes)
router.route('/:id')
  .get(getClientById)
  .put(protect, updateClient)  
  .delete(protect, deleteClient); 

export default router;
