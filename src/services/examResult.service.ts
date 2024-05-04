import { FilterQuery, PaginateOptions } from 'mongoose';
import { pick } from '../helpers/pick';
import { ExamResult, IExamResult } from '../models/examResult.model';

const getAllExamResults = async () => {
  const examResults = await ExamResult.find();
  return examResults;
};

type IExamResultQuery = FilterQuery<IExamResult> & PaginateOptions;

const queryExamResults = async (examResultQuery: IExamResultQuery) => {
  const filters = { ...examResultQuery };
  delete filters.page;
  delete filters.limit;

  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      const value = filters[key];
      filters[key] = decodeURIComponent(value);
    }
  }

  const options = pick(examResultQuery, ['page', 'limit']);
  const result = await ExamResult.paginate(filters, options);
  return result;
};

export default {
  getAllExamResults,
  queryExamResults,
};
