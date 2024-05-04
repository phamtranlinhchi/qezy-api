import mongoose, { Schema, mongo } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface IExamQuestion {
  questionId: mongoose.Types.ObjectId;
  point: number;
}

export interface IExam extends Document {
  examTitle: {
    type: String;
    required: true;
  };
  creator: mongoose.Types.ObjectId;
  questions?: IExamQuestion[];
  startTime?: Date;
  endTime?: Date;
}

const examSchema: Schema = new mongoose.Schema(
  {
    examTitle: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: {
      type: Array<{
        questionId: { type: mongoose.Types.ObjectId };
        point: { type: Number; default: 0 };
      }>,
    },
    startTime: Date,
    endTime: Date,
  },
  {
    timestamps: true,
  }
);

examSchema.plugin(paginate);
export const Exam = mongoose.model<IExam, mongoose.PaginateModel<IExam>>(
  'Exam',
  examSchema
);