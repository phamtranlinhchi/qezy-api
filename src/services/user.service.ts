import { FilterQuery, PaginateOptions } from 'mongoose';
import { IUser, User } from '../models/user.model';
import { v4 as uuid } from 'uuid';
import { pick } from '../helpers/pick';
import { ApiError } from '../middlewares/error';
import { HttpStatusCode } from 'axios';
import bcrypt from 'bcryptjs';


const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

type IUserQuery = FilterQuery<IUser> & PaginateOptions;

const queryUsers = async (userQuery: IUserQuery) => {
  const filters = { ...userQuery };
  delete filters.page;
  delete filters.limit;

  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      if (key === "search") {
        filters["username"] = { $regex: filters[key].trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" }
        delete filters[key]
      }
      else {
        const value = filters[key];
        filters[key] = decodeURIComponent(value);
      }
    }
  }

  const options = pick(userQuery, ['page', 'limit']);
  const result = await User.paginate(filters, {
    ...options,
    sort: { updatedAt: "desc" },
  });
  return result;
};

const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id)
    return user;
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (userBody: IUser) => {
  if (await User.findOne({ username: userBody.username })) {
    return {
      message: 'Existed username!',
      success: false,
    };
  }
  return { user: await User.create(userBody), success: true };
};

const updateUserById = async (id: string, user: any) => {
  delete user.username;
  if (user.password)
    user.password = await bcrypt.hash(user.password as string, 10);
  else
    delete user.password;

  const oldUser = await User.findByIdAndUpdate(id, user);
  return oldUser;
};

const deleteUserById = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

export default {
  getAllUsers,
  queryUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
