import prisma from "../config/prisma.client.js";
import createError from "../utils/create-error.util.js";
import checkIdentity from "../utils/check-identity.util.js";

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

    const result = await prisma.user.create({ data: newUser });

    res.json({
      msg: "register",
      result: result,
    })
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res, next) => {
  res.json({
    msg: "login",
    body: req.body,
  });
}

export const getMe = async (req, res) => {
  let numUser = await prisma.user.count();
  console.log(numUser);
  // createError(403,"Blocking");
  res.json({
    msg: "Get me controller",
    numUser
  });
}