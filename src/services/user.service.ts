import { FilterQuery, PaginateOptions } from 'mongoose';
import { IUser, User } from '../models/user.model';
import { v4 as uuid } from 'uuid';
import { pick } from '../helpers/pick';
import { ApiError } from '../middlewares/error';
import { HttpStatusCode } from 'axios';

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
      const value = filters[key];
      filters[key] = decodeURIComponent(value);
    }
  }

  const options = pick(userQuery, ['page', 'limit']);
  const result = await User.paginate(filters, options);
  return result;
};

const createUser = async (userBody: IUser) => {
  if (await User.findOne({ username: userBody.username })) {
    throw new ApiError(HttpStatusCode.BadRequest, 'Existed username');
  }

  if (userBody) {
    return User.create(userBody);
  }
};

export default {
  getAllUsers,
  queryUsers,
  createUser,
};
