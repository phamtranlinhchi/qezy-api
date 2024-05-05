import mongoose, { FilterQuery, PaginateOptions } from 'mongoose';
import { Exam, IExam } from '../models/exam.model';
import { pick } from '../helpers/pick';

const getAllExams = async () => {
  const exams = await Exam.find();
  return exams;
};

const getExamById = async (id: string) => {
  try {
    const exam = await Exam.findById(id).populate('questions.questionId');
    return exam;
  } catch (err) {
    console.log(err);
  }
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

const createExam = async (exam: IExam) => {
  const newExam = await Exam.create(exam);
  return newExam;
};

const updateExamById = async (id: string, exam: IExam) => {
  const oldExam = await Exam.findByIdAndUpdate(id, exam);
  return oldExam;
};

const deleteExamById = async (id: string) => {
  const exam = await Exam.findByIdAndDelete(id);
  return exam;
};

export default {
  getAllExams,
  getExamById,
  queryExams,
  createExam,
  updateExamById,
  deleteExamById,
};
