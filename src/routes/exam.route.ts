import express, { Router } from 'express';
import { auth, authorizeCreator } from '../middlewares/auth';
import examController from '../controllers/exam.controller';

export const examRouter: Router = express.Router();

// /api/exams/

examRouter.get('/all', auth, examController.getAllExams);
examRouter.get('/:id', auth, examController.getExamById);
examRouter.get('/', auth, examController.getExams);

examRouter.post('/', auth, examController.createExam);

examRouter.patch('/:id', auth, authorizeCreator, examController.updateExam);

examRouter.delete('/:id', auth, authorizeCreator, examController.deleteExam);
