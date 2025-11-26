const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
};

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: "password must be at least 3 characters long",
    });
  }

  const user = new User({
    username,
    name,
    passwordHash: await hashPassword(password),
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    author: 1,
    id: 1,
    likes: 1,
  });
  response.json(users);
});

module.exports = {
  usersRouter,
  hashPassword
};
