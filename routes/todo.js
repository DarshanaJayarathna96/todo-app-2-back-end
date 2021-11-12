const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();
const todoController = require("../controllers/todo");

// GET /todo/getAll
router.get("/getAll", todoController.getTodoLists);

// POST /todo/create
router.post(
  "/create",
  [
    body("title").trim().isLength({ min: 1 }),
    body("endDate").trim().isLength({ min: 5 }),
  ],
  todoController.createTodo,
);

// POST /todo/filter
router.post(
  "/filter",
  [
    body("status").trim().isLength({ min: 1 }),
    body("sort").trim().isLength({ min: 1 }),
  ],
  todoController.getTodoListsFilter,
);

//PUT /todo/update
router.put("/update/:todoId", todoController.updateTodo);

//DELETE /todo/delete
router.delete("/delete/:todoId", todoController.deleteTodo);

module.exports = router;
