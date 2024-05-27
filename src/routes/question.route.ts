import express, { Router } from 'express';
import { auth, authorizeCreator, isAdmin } from '../middlewares/auth';
import questionController from '../controllers/question.controller';

export const questionRouter: Router = express.Router();

// /api/questions/

questionRouter.get('/all', auth, questionController.getAllQuestions);
questionRouter.get('/:id', auth,
  questionController.getQuestionById);
questionRouter.get('/', auth,
  questionController.getQuestions);

questionRouter.post('/', auth,
  questionController.createQuestion);

questionRouter.put(
  '/:id',
  auth,
  // authorizeCreator,

  questionController.updateQuestion
);

questionRouter.delete(
  '/:id',
  auth,
  // authorizeCreator,

  questionController.deleteQuestion
);
