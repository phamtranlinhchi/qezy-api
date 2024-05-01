import { AxiosError, HttpStatusCode } from "axios";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import logger from "../helpers/logger";
import vars from "../config/vars";

export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true, stack = '') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const errorConverter = (err: Error | AxiosError, req: Request, res: Response, next: NextFunction) => {
  let error: Error | ApiError = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      'status' in error ? (error as AxiosError).response?.status :
        error instanceof mongoose.Error || error instanceof AxiosError ? HttpStatusCode.BadRequest : HttpStatusCode.InternalServerError;
    if (statusCode) {
      const message = error.message || HttpStatusCode[statusCode];
      error = new ApiError(statusCode, message, false, err.stack || '');
    }
  }
  next(error as Error);
};

export const errorHandler = (err: ApiError, req: Request, res: Response) => {
  let { statusCode, message } = err;

  if (vars.env === 'production' && !err.isOperational) {
    statusCode = HttpStatusCode.InternalServerError;
    message = "Internal server error";
  }

  const response = {
    code: statusCode,
    message,
    ...(vars.env === 'development' && { stack: err.stack }),
  };

  logger.error(err);
  res.status(statusCode).json(response);
};
