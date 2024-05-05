import bcrypt from 'bcryptjs';

import { User } from '../models/user.model';
import { hashPassword } from '../helpers/passwordFunction';
export const loginWithUsername = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password)))
    return { user, success: true };
  return {
    message: 'Wrong credential',
    success: false,
  };
};

export default {
  loginWithUsername,
};
