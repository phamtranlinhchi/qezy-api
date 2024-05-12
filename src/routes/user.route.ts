import express, { Router } from 'express';
import { auth } from '../middlewares/auth';
import userController from '../controllers/user.controller';

export const userRouter: Router = express.Router();

// /api/users/

userRouter.get('/all', auth, userController.getAllUsers);
userRouter.get('/current', auth, userController.getCurrentUser);
userRouter.get('/:id', auth, userController.getUserById);
userRouter.get('/', auth, userController.getUsers);

userRouter.patch('/:id', auth, userController.updateUser);

userRouter.delete('/:id', auth, userController.deleteUser);
