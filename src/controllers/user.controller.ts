import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import catchAsync from '../helpers/catchAsync';
import userService from '../services/user.service';
import jwt, { JwtPayload } from 'jsonwebtoken';

// [POST] /user/login
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, name, idToken, avatar } = req.body;
  const decode = jwt.decode(idToken) as JwtPayload;

  // const result = await userService.login(email, name, role, avatar);
  // return res.status(HttpStatusCode.Ok).json(result);
});

// [GET] /user
const getUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  const result = await userService.getUser(email as string);

  return res.status(HttpStatusCode.Ok).json(result);
});

// [GET] /user/users
const getUsersByRole = catchAsync(async (req: Request, res: Response) => {
  const { role } = req.query;
  const result = await userService.getUsersByRole(role as string);

  return res.status(HttpStatusCode.Ok).json(result);
});

export default {
  login,
  getUser,
  getUsersByRole,
};
