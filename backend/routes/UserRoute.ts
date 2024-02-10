// routes/userRoutes.ts
import express, { Router } from 'express';
import { Pool } from 'mysql2/promise';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

// function userRoutes(pool: Pool): Router {
  const router = express.Router();

  // Register a new user
  // console.log("76");
  
  // router.post('/register', (req, res) => userController.registerUser(req, res));
  router.post('/register', UserController.registerUser);
  // Login
  // router.post('/login', (req, res) => userController.loginUser(req, res));
  router.post('/login', UserController.loginUser);
  // Get user details
  // router.get('/:username', (req, res) => userController.getUserDetails(req, res));
  router.get('/:username', UserController.getUserDetails);
  // Update user details
  router.put('/:username', UserController.updateUserDetails);
  

  // return router;
// }

export default router;
