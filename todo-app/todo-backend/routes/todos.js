const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const redis = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const redisVisits = (await redis.getAsync("visits")) || 0;
  await redis.setAsync("visits", parseInt(redisVisits) + 1);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.id = id;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  // There is the mdidleware.
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  // use mdidleware
  const id = req.id;

  const { text, done } = req.body;

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { text, done },
    { new: true }
  );
  res.json(updatedTodo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
