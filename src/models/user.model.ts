import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  fullName: string;
  age?: string;
  role?: string;
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
    minlength: 8,
    maxlength: 30,
  },
  fullName: {
    type: String,
    required: true,
  },
  age: Number,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

userSchema.plugin(paginate);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password as string, 10);

  next();
});

export const User = mongoose.model<IUser, mongoose.PaginateModel<IUser>>(
  'User',
  userSchema
);
