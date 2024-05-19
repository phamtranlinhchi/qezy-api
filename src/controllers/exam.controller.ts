import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import catchAsync from '../helpers/catchAsync';
import examService from '../services/exam.service';

// [GET] /exams/all
const getAllExams = catchAsync(async (req: Request, res: Response) => {
  const exams = await examService.getAllExams();
  return res.status(HttpStatusCode.Ok).json(exams);
});

// [GET] /exams/:id
const getExamById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const exam = await examService.getExamById(id);
  return res.status(HttpStatusCode.Ok).json(exam);
});

// [GET] /exams
const getExamsByCurrentUser = catchAsync(async (req: Request, res: Response) => {
  const result = await examService.queryExams({
    ...req.query,
    // creator: req.currentUser 
  });

  return res.status(HttpStatusCode.Ok).json(result);
});

// [POST] /exams
const createExam = catchAsync(async (req: Request, res: Response) => {
  const exam = await examService.createExam({
    ...req.body,
    // creator: req.currentUser,
  });
  return res.status(HttpStatusCode.Ok).json(exam);
});

// [PATCH] /exams/:id
const updateExam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const exam = await examService.updateExamById(id, {
    ...req.body,
    // creator: req.currentUser,
  });
  return res.status(HttpStatusCode.Ok).json(exam);
});

// [DELETE] /exams/:id
const deleteExam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const exam = await examService.deleteExamById(id);
  return res.status(HttpStatusCode.Ok).json(exam);
});

export default {
  getAllExams,
  getExamById,
  getExams: getExamsByCurrentUser,
  createExam,
  updateExam,
  deleteExam,
};
