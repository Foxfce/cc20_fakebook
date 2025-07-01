import jwt from 'jsonwebtoken';
import createError from '../utils/create-error.util.js';
import { getUserBy } from '../services/user.service.js';

export default async function (req, res, next) {
  const authorization = req.headers.authorization
  if (!authorization || !authorization.startsWith('Bearer')) {
    createError(401, 'Have no authorization header');
  }
  const token = authorization.split(' ')[1]

  if(!token){
    createError(401, 'Unauthorized !! ');
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET, {algorithms : ['HS256']});
  const foundUser = await getUserBy('id',payload.id)
  if(!foundUser){
    createError(401, 'Unauthorized !!');
  }

  const {password, createAt, updatedAt, ...userData}  = foundUser

  req.user = userData;

  // res.json({
  //   msg: 'You have authorization header',
  //   token: token,
  //   payload: payload,
  //   user: foundUser,
  // });
  next();
  // const payload = jwt.verify(token, process.env.JWT_SECRET, {algorithms: ['HS256']});
}