import mongoose, { Schema, mongo } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IExamResult extends Document {
  examId: mongoose.Types.ObjectId;
  answerIds?: string[];
  candidate: mongoose.Types.ObjectId;
  score?: number;
  startTime: Date;
  endTime: Date;
}

const examResultSchema: Schema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    answers: {
      type: [
        {
          type: mongoose.Schema.Types.Mixed,
        },
      ],
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

examResultSchema.plugin(paginate);
export const ExamResult = mongoose.model<
  IExamResult,
  mongoose.PaginateModel<IExamResult>
>('ExamResult', examResultSchema);
