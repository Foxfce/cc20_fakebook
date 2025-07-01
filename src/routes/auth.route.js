import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import {
  loginSchema,
  registerSchema,
  validate
} from '../validation/validator.js';
import authenticate from '../middlewares/authenticate.middleware.js';

const authRoute = express.Router();

authRoute.post('/login',validate(loginSchema), authController.login);
authRoute.post('/register', validate(registerSchema), authController.registerYup);
authRoute.get('/me',authenticate, authController.getMe);

export default authRoute;