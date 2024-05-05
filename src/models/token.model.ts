import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface IToken extends Document {
  token: string;
  user: mongoose.Types.ObjectId;
  type: 'access' | 'refresh';
  expires: Date;
  blacklisted: boolean;
}

const tokenSchema: Schema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['access', 'refresh'],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.plugin(paginate);

export const Token = mongoose.model<IToken, mongoose.PaginateModel<IToken>>(
  'Token',
  tokenSchema
);
