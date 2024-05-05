import express, { Router } from 'express';
import { auth, authorizeCreator } from '../middlewares/auth';
import questionController from '../controllers/question.controller';

export const questionRouter: Router = express.Router();

// /api/questions/

questionRouter.get('/all', auth, questionController.getAllQuestions);
questionRouter.get('/', auth, questionController.getQuestions);

questionRouter.post('/', auth, questionController.createQuestion);

questionRouter.patch(
  '/:id',
  auth,
  authorizeCreator,
  questionController.updateQuestion
);

questionRouter.delete(
  '/:id',
  auth,
  authorizeCreator,
  questionController.deleteQuestion
);
