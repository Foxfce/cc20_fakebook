import prisma from "../config/prisma.client.js";
import createError from "../utils/create-error.util.js";
import checkIdentity from "../utils/check-identity.util.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {
  createUser,
  getUserBy
} from "../services/user.service.js";

export const register = async (req, res, next) => {
  try {
    const { identity, firstName, lastName, password, confirmPassword } = req.body

    // Validation
    if (!(identity.trim() && firstName.trim() && lastName.trim() && password.trim() && confirmPassword.trim())) {
      createError(400, "Please fill all data");
    }
    if (password != confirmPassword) createError(400, "check confirm password");

    // identity is email : String || phone : Number || checkIdentity(identity) => String : 'email' or 'mobile'
    const identityKey = checkIdentity(identity);

    // find user
    const foundUser = await prisma.user.findUnique({
      where: {
        [identityKey]: identity,
      },
    });

    if (foundUser) createError(409, `Already have user : ${identity}`);

    const newUser = {
      [identityKey]: identity,
      password: await bcrypt.hash(password, 10),
      firstName: firstName,
      lastName: lastName,
    }

    // const result = await prisma.user.create({ data: newUser });

    res.json({
      msg: "register",
      result: newUser,
    })
  } catch (error) {
    next(error);
  }
}

export async function registerYup(req, res, next) {
  try {
    const { email, mobile, firstName, lastName, password } = req.body;

    if (email) {
      // let foundUserEmail = await prisma.user.findUnique({ where: { email: email } });
      let foundUserEmail = await getUserBy('email', email)
      if (foundUserEmail) createError(409, `Email : ${email} already existed`);
    }
    if (mobile) {
      // let foundUserMobile = await prisma.user.findUnique({ where: { mobile: mobile } });
      let foundUserMobile = await getUserBy('mobile', mobile)
      if (foundUserMobile) createError(409, `Email : ${mobile} already existed`);
    }

    const newUser = {
      email,
      mobile,
      password: await bcrypt.hash(password, 10),
      firstName: firstName,
      lastName: lastName,
    }

    const result = await createUser(newUser);
    // const result = await prisma.user.create({ data: newUser });

    res.json({
      msg: "Registered Successful",
    })
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res, next) => {
  const { identity, password, email, mobile } = req.body;
  const identityKey = email ? 'email' : 'mobile'

  const foundUser = await getUserBy(identityKey, identity);
  if (!foundUser) createError(401, "Invalid username or password");

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordMatch) createError(401, "Invalid username or password");

  const payload = { id: foundUser.id, firstName: foundUser.firstName, lastName: foundUser.lastName };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '15d'
  });

  // Destructuring way to exclude data you don't need
  const {password : pw,createAt, updatedAt, ...userData} = foundUser

  res.json({
    msg: "Login Successful",
    accessToken: token,
    user: userData,
  });
}

export const getMe = async (req, res) => {
  // const token = (req.headers.authorization).split(' ').at(-1);
  // console.log(token);

  // const payload = jwt.verify(token, process.env.JWT_SECRET, {algorithms: ['HS256']});
  // console.log('payload ', payload)

  // let numUser = await prisma.user.count();
  // console.log(numUser);
  // createError(403,"Blocking");
  res.json({user: req.user});
}