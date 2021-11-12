const { validationResult } = require("express-validator/check");
const Todo = require("../models/todo");

exports.getTodoLists = (req, res, next) => {
  let totalItems;
  Todo.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Todo.find();
    })
    .then((todoLists) => {
      res.status(200).json({
        message: "Fetched Todo List successfully.",
        todoLists: todoLists,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTodoListsFilter = (req, res, next) => {
  let totalItems;
  const status = req.body.status;
  const check = status === "completed" ? true : false;
  const sort = req.body.sort;
  const filter = { status: check };
  Todo.find()
    .countDocuments()
    .then(() => {
      if (
        (status == "completed" || status == "uncompleted") &&
        (sort === "asc" || sort === "desc")
      ) {
        return Todo.find(filter).sort({ endDate: sort });
      }
      if ((status == "completed" || status == "completed") &&  sort === "default") {
        return Todo.find(filter);
      }
      if ((sort === "asc" || sort === "desc") && status === "default") {
        return Todo.find().sort({ endDate: sort });
      } else {
        return Todo.find();
      }
    })
    .then((todoLists) => {
      res.status(200).json({
        message: "Fetched Todo List successfully.",
        todoLists: todoLists,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createTodo = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const endDate = req.body.endDate;
  const todo = new Todo({
    title: title,
    endDate: endDate,
  });
  todo
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Todo created successfully!",
        todo: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const status = req.body.status;
  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        const error = new Error("Could not find todo.");
        error.statusCode = 404;
        throw error;
      }
      todo.status = status;
      return todo.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Todo updated!", todo: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        const error = new Error("Could not find todo.");
        error.statusCode = 404;
        throw error;
      }
      return Todo.findOneAndDelete(todoId);
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted todo.", todo: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
