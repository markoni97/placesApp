const uuid = require("uuid").v4;
const HttpError = require("../modules/http-error");
const { validationResult } = require('express-validator');

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Marko Radenkovic",
    email: "marko@gmail.com",
    password: "123456",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signupUser = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    throw new HttpError('Invalid inputs passed. Please check your data', 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("Could not create user, email already exists", 422);
  }

  const user = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(user);

  res.status(200).json({ user: user });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not identify, credentials are wrong", 401);
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
