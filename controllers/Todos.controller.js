const { TodoModel } = require("../models/Todos.model");

const getTodos = async (req, res) => {
  const { user_id } = req.body;
  const todos = await TodoModel.find({ user_id: user_id });
  res.send(todos);
};

const getTodo = async (req, res) => {
  const { user_id } = req.body;
  const todo = await TodoModel.find({ user_id: req.user_id });
  res.send(todo);
};

const createTodo = async (req, res) => {
  const { taskname, status, tag, user_id } = req.body;

  const notes = await TodoModel.create({
    taskname,
    status,
    tag,
    user_id,
  });
  res.send({ msg: "Todo created succesfully" });
};

const updateTodo = async (req, res) => {
  const todo = await TodoModel.find({ _id: req.params.id });
  if (!todo) {
    res.status(400);
    res.send("todo not found");
  }

  const update = await TodoModel.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).send({ masg: "Todo updated successfully" });
};

const deleteTodo = async (req, res) => {
  const todo = await TodoModel.findByIdAndRemove({ _id: req.params.id });
  if (!todo) {
    res.status(400);
    res.sen("todo not Found");
  }
  res.status(200).send({ mas: "Notes Deleted Successfully" });
};

module.exports = { getTodo, getTodos, createTodo, updateTodo, deleteTodo };
