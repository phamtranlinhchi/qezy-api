import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';

// import { signInUser } from "../services/auth.service";
import catchAsync from '../helpers/catchAsync';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import tokenService from '../services/token.service';

// [POST] /auth/login
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginWithUsername(req.body);
  if (result.success) {
    const { access: accessToken } = await tokenService.generateAuthToken(
      result.user
    );

    return res
      .status(HttpStatusCode.Ok)
      .json({ accessToken, message: 'Login successfull' });
  }
  return res
    .status(HttpStatusCode.Unauthorized)
    .json({ message: 'Username or password is incorrect!' });
});

// [POST] /auth/register
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(HttpStatusCode.Created).json({ message: 'Register successfull' });
});
export default {
  login,
  register,
};
