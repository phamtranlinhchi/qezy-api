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
const getQuestionsByCurrentUser = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.queryQuestions({
    ...req.query,
    // creator: req.currentUser
  });
  return res.status(HttpStatusCode.Ok).json(result);
});

// [GET] /questions/:id
const getQuestionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const question = await questionService.getQuestionById(id);
  return res.status(HttpStatusCode.Ok).json(question);
});

// [POST] /questions
const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const question = await questionService.createQuestion({
    ...req.body,
    creator: req.currentUser,
  });
  return res.status(HttpStatusCode.Ok).json(question);
});

// [PATCH] /questions/:id
const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  delete req.body.creator;

  const question = await questionService.updateQuestionById(id, req.body);
  return res.status(HttpStatusCode.Ok).json(question);
});

// [DELETE] /questions/:id
const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const question = await questionService.deleteQuestionById(id);
  return res.status(HttpStatusCode.Ok).json(question);
});

export default {
  getAllQuestions,
  getQuestions: getQuestionsByCurrentUser,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
