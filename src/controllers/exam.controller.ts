import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import catchAsync from '../helpers/catchAsync';
import examService from '../services/exam.service';

// [GET] /exams/all
const getAllExams = catchAsync(async (req: Request, res: Response) => {
  const exams = await examService.getAllExams();
  return res.status(HttpStatusCode.Ok).json(exams);
});

// [GET] /exams
const getExams = catchAsync(async (req: Request, res: Response) => {
  const result = await examService.queryExams(req.query);
  return res.status(HttpStatusCode.Ok).json(result);
});

export default {
  getAllExams,
  getExams,
};
