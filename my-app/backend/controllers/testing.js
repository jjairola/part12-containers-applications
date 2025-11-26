const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { hashPassword } = require("./users");

router.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const initialUser = new User({
    username: "test",
    name: "Test User",
    passwordHash: await hashPassword("test123"),
  });

  await initialUser.save();

  response.status(204).end();
});

module.exports = router;
