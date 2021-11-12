const { createTodo } = require("../_mocks_/todo-controller");

test("should store title and end date", () => {
  const todo = createTodo("test", "2021-11-12");
  expect(todo).toStrictEqual({ title: "test", endDate: "2021-11-12" });
});
