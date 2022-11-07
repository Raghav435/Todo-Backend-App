const express = require("express");
const connection = require("./config/db");
const todosRouter = require("./routes/Todos.route");
const userRouter = require("./routes/User.route");
require("dotenv").config();
const PORT = process.env.PORT || 8002;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to TodoApp");
});
app.use("/", userRouter);
app.use("/todos", todosRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("You are successfully connected to database");
  } catch (err) {
    console.log("Something error in database");
  }
  console.log(`Server is listening on ${PORT}`);
});
