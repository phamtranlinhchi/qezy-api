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

export default {
  getAllUsers,
  getUsers,
};
