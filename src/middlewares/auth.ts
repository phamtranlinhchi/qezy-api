import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from 'axios';

import { ApiError } from './error';
import catchAsync from '../helpers/catchAsync';
import logger from '../helpers/logger';
import tokenService from '../services/token.service';
import examService from '../services/exam.service';
import questionService from '../services/question.service';
import userService from "../services/user.service";

export const auth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1];

      if (!accessToken)
        return next(
          new ApiError(HttpStatusCode.Unauthorized, 'No access token found')
        );

      const payload = await tokenService.verifyToken(accessToken, 'access');
      req.currentUser = payload.sub as string;
      return next();
    } catch (err) {
      throw new ApiError(HttpStatusCode.Unauthorized, 'Invalid access token');
    }
  }
);

export const isAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser)
    return next(
      new ApiError(HttpStatusCode.Unauthorized, 'No access token found')
    );
  const user = await userService.getUserById(req.currentUser);
  if (user?.role === "admin")
    return next();
  return next(
    new ApiError(HttpStatusCode.Unauthorized, 'Not admin')
  );
});

export const authorizeCreator = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const match = req.originalUrl.match(/\/api\/(\w+)/);
    if (match) {
      const type = match[1];
      const { id } = req.params;
      const existeObj =
        type === 'exams'
          ? await examService.getExamById(id)
          : await questionService.getQuestionById(id);

      if (!existeObj) {
        throw new ApiError(HttpStatusCode.BadRequest, 'Invalid id');
      } else if (req.currentUser === existeObj?.creator.toString())
        return next();
      else {
        throw new ApiError(HttpStatusCode.Unauthorized, 'Not the creator');
      }
    }
  }
);
