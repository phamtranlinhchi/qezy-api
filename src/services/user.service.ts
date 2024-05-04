import { User } from '../models/user.model';
import { v4 as uuid } from 'uuid';

const login = async (
  email: string,
  name: string,
  role: string,
  avatar: string
) => {
  const existedUser = await User.findOne({ email: email });
  const newUser = await User.create({
    id: uuid(),
    email,
    name,
    role,
    avatar,
  });

  return newUser;
};

const getUser = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    console.log('Can not find user!');
  }

  return user;
};

const getUsersByRole = async (role: string) => {
  const users = await User.find({ role });
  return users;
};

export default {
  login,
  getUser,
  getUsersByRole,
};
