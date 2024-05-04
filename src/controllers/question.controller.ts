import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import catchAsync from '../helpers/catchAsync';
import questionService from '../services/question.service';

// [GET] /questions/all
const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const questions = await questionService.getAllQuestions();
  return res.status(HttpStatusCode.Ok).json(questions);
});

// [GET] /questions
const getQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.queryQuestions(req.query);
  return res.status(HttpStatusCode.Ok).json(result);
});

export default {
  getAllQuestions,
  getQuestions,
};
