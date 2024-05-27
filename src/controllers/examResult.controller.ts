import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import catchAsync from '../helpers/catchAsync';
import examResultService from '../services/examResult.service';

// [GET] /results/all
const getAllExamResults = catchAsync(async (req: Request, res: Response) => {
  const examResults = await examResultService.getAllExamResults();
  return res.status(HttpStatusCode.Ok).json(examResults);
});

// [GET] /results/:id
const getExamResultById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await examResultService.getResById(id);
  return res.status(HttpStatusCode.Ok).json(result);
});

// [GET] /results
const getExamResults = catchAsync(async (req: Request, res: Response) => {
  const result = await examResultService.queryExamResults(req.query);
  return res.status(HttpStatusCode.Ok).json(result);
});

// [POST] /results
const createExamResult = catchAsync(async (req: Request, res: Response) => {
  const exam = await examResultService.createExamResult({
    ...req.body,
    candidate: req.currentUser,
  });
  return res.status(HttpStatusCode.Ok).json(exam);
});

// [PATCH] /results/:id
const updateExamResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const exam = await examResultService.updateExamResultById(id, {
    ...req.body,
    candidate: req.currentUser,
  });
  return res.status(HttpStatusCode.Ok).json(exam);
});

// [DELETE] /results/:id
const deleteExamResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const exam = await examResultService.deleteExamResultById(id);
  return res.status(HttpStatusCode.Ok).json(exam);
});

export default {
  getAllExamResults,
  getExamResultById,
  getExamResults,
  createExamResult,
  updateExamResult,
  deleteExamResult,
};
