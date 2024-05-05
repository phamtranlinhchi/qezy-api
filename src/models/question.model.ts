import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface IAnswer {
  answer: string | number;
  istrue: boolean;
}

export interface IQuestion extends Document {
  examIds?: mongoose.Types.ObjectId[];
  type: 'checkbox' | 'radio' | 'short' | 'long';
  quest: string;
  answers: IAnswer[];
  creator: mongoose.Types.ObjectId;
}

const questionSchema: Schema = new mongoose.Schema(
  {
    examIds: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
      default: [],
    },
    type: {
      type: String,
      required: true,
      enum: ['checkbox', 'radio', 'short', 'long'],
    },
    quest: {
      type: String,
      required: true,
      trim: true,
    },
    answers: {
      type: [
        {
          answer: { type: Schema.Types.Mixed },
          isTrue: { type: Boolean, required: true },
        },
      ],
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

questionSchema.plugin(paginate);
export const Question = mongoose.model<
  IQuestion,
  mongoose.PaginateModel<IQuestion>
>('Question', questionSchema);
