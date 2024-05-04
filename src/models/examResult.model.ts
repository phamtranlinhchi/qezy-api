import mongoose, { Schema, mongo } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IExamResult extends Document {
  examId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  score: number;
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    startTime: Date,
    endTime: Date,
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
