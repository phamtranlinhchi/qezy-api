import mongoose, { FilterQuery, PaginateOptions } from 'mongoose';
import { Exam, IExam } from '../models/exam.model';
import { pick } from '../helpers/pick';
import { Question } from '../models/question.model';

const getAllExams = async () => {
  const exams = await Exam.find().populate('questions.questionId');
  return exams;
};

const getExamById = async (id: string) => {
  try {
    const exam = await Exam.findById(id).populate({
      path: 'questions',
      populate: { path: 'questionId' },
    });
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
  const result = await Exam.paginate(filters, {
    ...options,
    populate: ['questions.questionId'],
  });
  return result;
};

const createExam = async (exam: IExam) => {
  const newExam = await Exam.create(exam);
  if (exam.questions && exam.questions.length > 0) {
    const questions = await Question.updateMany(
      { _id: { $in: exam.questions.map((question) => question.questionId) } },
      {
        $push: {
          examIds: newExam._id,
        },
      }
    );
  }
  return newExam;
};

const updateExamById = async (id: string, exam: IExam) => {
  const oldExam = await Exam.findByIdAndUpdate(id, exam);
  if (exam.questions) {
    const questionsWithOldExam = await Question.updateMany(
      {
        _id: {
          $in: oldExam?.questions?.map((question) => question.questionId),
        },
      },
      { $pull: { examIds: oldExam?._id } }
    );
    const questionsWithUpdatedExam = await Exam.updateMany(
      { _id: { $in: exam.questions.map((question) => question.questionId) } },
      { $push: { examIds: id } }
    );
    return {
      oldExam,
      questionsWithOldExam,
      questionsWithUpdatedExam,
    };
  }
  return oldExam;
};

const deleteExamById = async (id: string) => {
  const deletedExam = await Exam.findByIdAndDelete(id);
  const questionWithDeletedExam = await Question.updateMany(
    {
      _id: {
        $in: deletedExam?.questions?.map((question) => question.questionId),
      },
    },
    { $pull: { examIds: deletedExam?._id } }
  );
  return deletedExam;
};

export default {
  getAllExams,
  getExamById,
  queryExams,
  createExam,
  updateExamById,
  deleteExamById,
};
