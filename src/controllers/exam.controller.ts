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

// [GET] /exams/temp/:id
const getExamTempById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const exam: any = await examService.getExamById(id);
  let newQuestions = [...exam.questions];
  newQuestions = newQuestions.map((quest: any) => {
    let correctAnswers;
    quest.questionId.answers.forEach((a: any) => {
      if (a.isTrue)
        correctAnswers = [a.answer]
    })
    return {
      question: quest.questionId.quest,
      score: quest.point,
      choices: quest.questionId.answers.map((a: any) => a.answer),
      type: "MCQs",
      correctAnswers
    }
  })

  // "questions": [
  //   {
  //       "questionId": {
  //           "_id": "66408536ff8ea6e6b351ae8b",
  //           "examIds": [
  //               "66409b457cbe605f31312599"
  //           ],
  //           "type": "radio",
  //           "quest": "the first question is so longgggg so that I can test something",
  //           "answers": [
  //               {
  //                   "answer": "correct answer",
  //                   "isTrue": true,
  //                   "_id": "6653787d0c2448cc7295c183"
  //               },
  //               {
  //                   "answer": "wrong answer",
  //                   "isTrue": false,
  //                   "_id": "6653787d0c2448cc7295c184"
  //               }
  //           ],
  //           "creator": "66374a6447881c2f10672945",
  //           "createdAt": "2024-05-12T09:00:38.614Z",
  //           "updatedAt": "2024-05-26T19:08:20.473Z",
  //           "__v": 0
  //       },
  //       "point": 10,
  //       "_id": "665388a40c2448cc7295e958"
  //   },
  // ]
  return res.status(HttpStatusCode.Ok).json({ ...exam._doc, questions: newQuestions });
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
  getExamTempById,
  getExams: getExamsByCurrentUser,
  createExam,
  updateExam,
  deleteExam,
};
