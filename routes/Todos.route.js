const express = require("express");
const {
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  createTodo,
} = require("../controllers/Todos.controller");
const { authentication } = require("../middlewares/authentication");
const todosRouter = express.Router();

todosRouter.get("/", authentication, getTodos);

todosRouter.get("/:id", authentication, getTodo);

todosRouter.post("/create", authentication, createTodo);

todosRouter.put("/:id", authentication, updateTodo);

todosRouter.delete("/:id", authentication, deleteTodo);

module.exports = todosRouter;
