import express, { Router } from 'express';
import { auth, isAdmin } from '../middlewares/auth';
import userController from '../controllers/user.controller';

export const userRouter: Router = express.Router();

// /api/users/

userRouter.get('/all', auth, isAdmin, userController.getAllUsers);
userRouter.get('/current', auth, userController.getCurrentUser);
userRouter.get('/:id', auth, isAdmin, userController.getUserById);
userRouter.get('/', auth, isAdmin, userController.getUsers);

userRouter.patch('/:id', auth, isAdmin, userController.updateUser);

userRouter.delete('/:id', auth, isAdmin, userController.deleteUser);
