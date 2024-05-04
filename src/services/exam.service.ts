import { FilterQuery, PaginateOptions } from 'mongoose';
import { Exam, IExam } from '../models/exam.model';
import { pick } from '../helpers/pick';

const getAllExams = async () => {
  const exams = await Exam.find();
  return exams;
};

const getExamById = async (id: string) => {
  const exam = await Exam.findById(id).populate('Question');
  return exam;
};

type IExamQuery = FilterQuery<IExam> & PaginateOptions;

const queryExams = async (examQuery: IExamQuery) => {
  const filters = { ...examQuery };
  delete filters.page;
  delete filters.limit;

  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      const value = filters[key];
      filters[key] = decodeURIComponent(value);
    }
  }

  const options = pick(examQuery, ['page', 'limit']);
  const result = await Exam.paginate(filters, options);
  return result;
};

export default {
  getAllExams,
  getExamById,
  queryExams,
};
