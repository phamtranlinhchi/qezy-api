import express, { Router } from 'express';
import { auth, authorizeCreator, isAdmin } from '../middlewares/auth';
import examController from '../controllers/exam.controller';

export const examRouter: Router = express.Router();

// /api/exams/

examRouter.get('/all', auth, examController.getAllExams);
examRouter.get('/temp/:id', auth, examController.getExamTempById);
examRouter.get('/:id', auth, examController.getExamById);
examRouter.get('/', auth, examController.getExams);

examRouter.post('/', auth, examController.createExam);

examRouter.put('/:id', auth,
  // authorizeCreator,
  examController.updateExam);

examRouter.delete('/:id', auth,
  // authorizeCreator,
  examController.deleteExam);
