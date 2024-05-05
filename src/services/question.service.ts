import { FilterQuery, PaginateOptions } from 'mongoose';
import { Question, IQuestion } from '../models/question.model';
import { pick } from '../helpers/pick';
import { Exam } from '../models/exam.model';

const getAllQuestions = async () => {
  const questions = await Question.find();
  return questions;
};

const getQuestionById = async (id: string) => {
  try {
    const question = await Question.findById(id);
    return question;
  } catch (err) {
    console.log(err);
  }
};

type IQuestionQuery = FilterQuery<IQuestion> & PaginateOptions;

const queryQuestions = async (questionQuery: IQuestionQuery) => {
  const filters = { ...questionQuery };
  delete filters.page;
  delete filters.limit;

  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      const value = filters[key];
      filters[key] = decodeURIComponent(value);
    }
  }

  const options = pick(questionQuery, ['page', 'limit']);
  const result = await Question.paginate(filters, options);
  return result;
};

const createQuestion = async (question: IQuestion) => {
  const newQuest = await Question.create(question);
  if (question.examIds && question.examIds?.length > 0) {
    // Add question id to exam
    const exams = await Exam.updateMany(
      { _id: { $in: question.examIds } },
      { $push: { questions: { questionId: newQuest.id, point: 0 } } }
    );
  }
  return newQuest;
};

const updateQuestionById = async (id: string, question: IQuestion) => {
  const oldQuestion = await Question.findByIdAndUpdate(id, question);
  if (question.examIds && question.examIds?.length > 0) {
    // Need to update exam when updating question
    // TODO
    const exams = await Exam.updateMany(
      { _id: { $in: oldQuestion?.examIds } },
      { $pullAll: { questions: { questionId: oldQuestion?.id } } }
    );
  }
  return oldQuestion;
};

const deleteQuestionById = async (id: string) => {
  const question = await Question.findByIdAndDelete(id);
  return question;
};

export default {
  getAllQuestions,
  getQuestionById,
  queryQuestions,
  createQuestion,
  updateQuestionById,
  deleteQuestionById,
};
