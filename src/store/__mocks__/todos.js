export default class TodosHandlerMock {
  getAndSetTodos = jest.fn();
  setCurrentTodo = jest.fn();
  checkForTodo = jest.fn();
  saveTodo = jest.fn();
  seeIfTodoTimeIsPassed = jest.fn();
}