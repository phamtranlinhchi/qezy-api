import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import axios from 'axios';

import { ApiError } from './error';
import catchAsync from '../helpers/catchAsync';
import logger from '../helpers/logger';
import tokenService from '../services/token.service';

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
