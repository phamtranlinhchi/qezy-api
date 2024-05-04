import { FilterQuery, PaginateOptions } from 'mongoose';
import { Question, IQuestion } from '../models/question.model';
import { pick } from '../helpers/pick';

const getAllQuestions = async () => {
  const questions = await Question.find();
  return questions;
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

export default {
  getAllQuestions,
  queryQuestions,
};
