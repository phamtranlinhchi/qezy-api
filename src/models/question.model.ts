import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface IAnswer {
  answer: string | number;
  istrue: boolean;
}

export interface IQuestion extends Document {
  type: 'checkbox' | 'radio' | 'short' | 'long';
  quest: string;
  answers: IAnswer[];
}

const questionSchema: Schema = new mongoose.Schema(
  {
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
      type: Array<{
        answer: { type: String | Number };
        isTrue: { type: Boolean; default: false };
      }>,
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
