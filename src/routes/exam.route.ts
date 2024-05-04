import express, { Router } from 'express';
import { auth } from '../middlewares/auth';
import examController from '../controllers/exam.controller';

export const examRouter: Router = express.Router();

// /api/exams/
examRouter.get('/all', auth, examController.getAllExams);
examRouter.get('/', auth, examController.getExams);
