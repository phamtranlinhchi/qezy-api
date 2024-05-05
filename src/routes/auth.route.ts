import express, { Router } from 'express';
import authController from '../controllers/auth.controller';
export const authRouter: Router = express.Router();

// /api/auth
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
