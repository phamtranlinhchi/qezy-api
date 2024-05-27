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
  const result = await ExamResult.paginate(filters, {
    ...options,
    sort: { updatedAt: "desc" },
    populate: ['candidate', 'examId'],
  });
  return result;
};

const createExamResult = async (examResult: IExamResult) => {
  const newExamResult = await ExamResult.create(examResult);
  return newExamResult;
};

const updateExamResultById = async (id: string, examResult: IExamResult) => {
  const oldExamResult = await ExamResult.findByIdAndUpdate(id, examResult);
  return oldExamResult;
};

const deleteExamResultById = async (id: string) => {
  const deletedExamResult = await ExamResult.findByIdAndDelete(id);
  return deletedExamResult;
};

export default {
  getAllExamResults,
  queryExamResults,
  createExamResult,
  updateExamResultById,
  deleteExamResultById,
};
