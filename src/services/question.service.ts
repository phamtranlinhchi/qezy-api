import { FilterQuery, PaginateOptions } from 'mongoose';
import { Question, IQuestion } from '../models/question.model';
import { pick } from '../helpers/pick';
import { Exam } from '../models/exam.model';
import { ObjectId } from 'mongodb';
import examService from "./exam.service";

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
  const newQuest = await Question.create({
    ...question,
    examIds: question.examIds?.map(async (examId) => await examService.getExamById(examId.toString()) ? new ObjectId(examId) : null),
  });

  if (question.examIds && question.examIds?.length > 0) {
    // Add question id to exam
    const exams = await Exam.updateMany(
      { _id: { $in: question.examIds } },
      {
        $push: {
          questions: { questionId: new ObjectId(newQuest._id), point: 0 },
        },
      }
    );
  }
  return newQuest;
};

const updateQuestionById = async (id: string, question: IQuestion) => {
  const oldQuestion = await Question.findByIdAndUpdate(id, question);
  if (question.examIds) {
    const examsWithOldQuestion = await Exam.updateMany(
      { _id: { $in: oldQuestion?.examIds } },
      { $pull: { questions: { questionId: oldQuestion?._id } } }
    );
    const examsWithUpdatedQuest = await Exam.updateMany(
      { _id: { $in: question.examIds } },
      { $push: { questions: { questionId: new ObjectId(id), point: 0 } } }
    );
    return {
      oldQuestion,
      removedQuestionExamsCount: examsWithOldQuestion.modifiedCount,
      updatedQuestionExamsCount: examsWithUpdatedQuest.modifiedCount,
    };
  }
  return { oldQuestion };
};

const deleteQuestionById = async (id: string) => {
  const deletedQuestion = await Question.findByIdAndDelete(id);
  const examsWithDeletedQuestion = await Exam.updateMany(
    { _id: { $in: deletedQuestion?.examIds } },
    { $pull: { questions: { questionId: deletedQuestion?._id } } }
  );
  return {
    deletedQuestion,
    examsWithDeletedQuestionCount: examsWithDeletedQuestion.modifiedCount,
  };
};

export default {
  getAllQuestions,
  getQuestionById,
  queryQuestions,
  createQuestion,
  updateQuestionById,
  deleteQuestionById,
};
