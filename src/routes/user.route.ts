import express, { Router } from 'express';
import { auth } from '../middlewares/auth';
import userController from '../controllers/user.controller';

export const userRouter: Router = express.Router();

// /api/users/
userRouter.get('/all', auth, userController.getAllUsers);
userRouter.get('/', auth, userController.getUsers);
