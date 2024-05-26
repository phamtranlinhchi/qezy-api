import express, { Router } from 'express';
import { auth, authorizeCreator, isAdmin } from '../middlewares/auth';
import examController from '../controllers/exam.controller';

export const examRouter: Router = express.Router();

// /api/exams/

examRouter.get('/all', auth, isAdmin, examController.getAllExams);
examRouter.get('/:id', auth, isAdmin, examController.getExamById);
examRouter.get('/', auth, isAdmin, examController.getExams);

examRouter.post('/', auth, isAdmin, examController.createExam);

examRouter.put('/:id', auth, isAdmin,
  // authorizeCreator,
  examController.updateExam);

examRouter.delete('/:id', auth, isAdmin,
  // authorizeCreator,
  examController.deleteExam);
