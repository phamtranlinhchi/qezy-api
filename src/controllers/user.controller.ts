import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import catchAsync from '../helpers/catchAsync';
import userService from '../services/user.service';
import jwt, { JwtPayload } from 'jsonwebtoken';

// [GET] /users/all
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res.status(HttpStatusCode.Ok).json(users);
});

// [GET] /users
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.queryUsers(req.query);
  return res.status(HttpStatusCode.Ok).json(result);
});

// [GET] /users/current
const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.queryUsers({ _id: req.currentUser });
  return res.status(HttpStatusCode.Ok).json(result.docs[0]);
});

// [GET] /users/:id
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.getUserById(id);
  return res.status(HttpStatusCode.Ok).json(result);
});

// [PATCH] /users/:id
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.updateUserById(id, req.body);
  return res.status(HttpStatusCode.Ok).json(user);
});

// [DELETE] /users/:id
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.deleteUserById(id);
  return res.status(HttpStatusCode.Ok).json(user);
});

export default {
  getAllUsers,
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  deleteUser,
};
