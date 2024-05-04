import express, { Router } from 'express';
import { auth } from '../middlewares/auth';
import questionController from '../controllers/question.controller';

export const questionRouter: Router = express.Router();

// /api/questions/
questionRouter.get('/all', auth, questionController.getAllQuestions);
questionRouter.get('/', auth, questionController.getQuestions);
