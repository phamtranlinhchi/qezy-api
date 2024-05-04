import { FilterQuery, PaginateOptions } from 'mongoose';
import { IUser, User } from '../models/user.model';
import { v4 as uuid } from 'uuid';
import { pick } from '../helpers/pick';

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

export default {
  getAllUsers,
  queryUsers,
};
