import jwt from 'jsonwebtoken';
import moment from 'moment';

import vars from '../config/vars';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';

const generateToken = (
  sub: any,
  expires: any,
  type: any,
  secret = vars.jwt.secret
) => {
  const payload = {
    sub,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };

  return jwt.sign(payload, secret);
};

const generateAuthToken = async (user: any) => {
  const accessTokenExpires = moment().add('480', 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, 'access');

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

const saveToken = async (
  token: any,
  userId: any,
  expires: any,
  type: any,
  blacklisted = false
) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });

  return tokenDoc;
};

const verifyToken = async (token: any, type: any) => {
  const payload = jwt.verify(token, vars.jwt.secret);
  const user = await User.findById(payload.sub);
  if (user) return payload;
  throw new Error('invalid token');
};

export default {
  generateToken,
  generateAuthToken,
  saveToken,
  verifyToken,
};
