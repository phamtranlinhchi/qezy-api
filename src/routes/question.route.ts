import express, { Router } from 'express';
import { auth, authorizeCreator, isAdmin } from '../middlewares/auth';
import questionController from '../controllers/question.controller';

export const questionRouter: Router = express.Router();

// /api/questions/

questionRouter.get('/all', auth, isAdmin, questionController.getAllQuestions);
questionRouter.get('/', auth,
  isAdmin, questionController.getQuestions);

questionRouter.post('/', auth,
  isAdmin, questionController.createQuestion);

questionRouter.patch(
  '/:id',
  auth,
  // authorizeCreator,
  isAdmin,
  questionController.updateQuestion
);

questionRouter.delete(
  '/:id',
  auth,
  // authorizeCreator,
  isAdmin,
  questionController.deleteQuestion
);
