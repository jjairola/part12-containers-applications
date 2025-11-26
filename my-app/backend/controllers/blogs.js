const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const userExtractor = require("../utils/middleware").userExtractor;

blogsRouter.get("/", async (request, response) => {
  const blgos = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blgos);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({
    ...request.body,
    user: request.user._id,
  });

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url missing" }).end();
  }

  const result = await blog.save();
  await User.findByIdAndUpdate(result.user, {
    $push: { blogs: result._id },
  });

  const populatedResult = await result.populate("user");

  response.status(201).json(populatedResult);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }

  if (blog.user && blog.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: "unauthorized" });
  }

  await Blog.findByIdAndDelete(request.params.id);

  if (blog.user) {
    await User.findByIdAndUpdate(blog.user, { $pull: { blogs: blog._id } });
  }

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    context: "query",
  });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
