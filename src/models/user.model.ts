import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IUser extends Document {
  username: string;
  password: string;
  fullName: string;
  age?: string;
}

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  age: Number,
});

userSchema.plugin(paginate);
export const User = mongoose.model<IUser, mongoose.PaginateModel<IUser>>(
  'User',
  userSchema
);
