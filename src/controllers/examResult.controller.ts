import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import catchAsync from '../helpers/catchAsync';
import examResultService from '../services/examResult.service';

// [GET] /results/all
const getAllExamResults = catchAsync(async (req: Request, res: Response) => {
  const examResults = await examResultService.getAllExamResults();
  return res.status(HttpStatusCode.Ok).json(examResults);
});

// [GET] /results
const getExamResults = catchAsync(async (req: Request, res: Response) => {
  const result = await examResultService.queryExamResults(req.query);
  return res.status(HttpStatusCode.Ok).json(result);
});

export default {
  getAllExamResults,
  getExamResults,
};
