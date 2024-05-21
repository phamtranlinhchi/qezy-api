import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import catchAsync from '../helpers/catchAsync';
import examService from '../services/exam.service';
import questionService from "../services/question.service";

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
  let { questions } = req.body;
  const newQuestions = []
  if (questions.length > 0) {
    for await (const question of questions) {
      if (question.questionId)
        newQuestions.push(question);
      else {
        const newQuestion = await questionService.createQuestion({ ...question, creator: req.currentUser });
        newQuestions.push({ questionId: newQuestion.id, point: question.point });
      }
    }
  }

  console.log(newQuestions);

  const exam = await examService.createExam({
    ...req.body,
    questions: newQuestions,
    creator: req.currentUser,
  });
  return res.status(HttpStatusCode.Ok).json(exam);
});

// [PATCH] /exams/:id
const updateExam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  delete req.body.creator;

  const exam = await examService.updateExamById(id, {
    ...req.body,
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
