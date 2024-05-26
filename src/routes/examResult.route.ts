import express, { Router } from 'express';
import { auth } from '../middlewares/auth';
import examResultController from '../controllers/examResult.controller';

export const examResultRouter: Router = express.Router();

// /api/results/

examResultRouter.get('/all', auth, examResultController.getAllExamResults);
examResultRouter.get('/', auth, examResultController.getExamResults);

examResultRouter.post('/', auth, examResultController.createExamResult);

examResultRouter.put('/:id', auth, examResultController.updateExamResult);

examResultRouter.delete('/:id', auth, examResultController.deleteExamResult);
