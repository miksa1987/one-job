import database from '../database/database';

export const getAndSetTodos = (user) => {
  return async (dispatch) => {
    const todos = await makeTodosObjectToArray(user);
    dispatch({ type: 'SET_ALL_TODOS', data: todos });
  }
} 

export const setCurrentTodo = (todos, date) => {
  return (dispatch) => {
    dispatch({ type: 'SET_LOADING', data: true });
    const filteredTodos = todos.filter((todo) => todo.date === date);
    let currentTodo = {};

    if (checkForTodo(todos, date)) {
      currentTodo = filteredTodos[0];
    }
    else {
      currentTodo = { date, task: '', reflect: ''};
    }
    dispatch({ type: 'SET_CURRENT_TODO', data: currentTodo });
    dispatch({ type: 'SET_LOADING', data: false });
  }
}

export const checkForTodo = (todos, date) => {
  let found = false;
  todos.forEach((todo) => {
    if (todo.date === date) {
      found = true;
    }
  });
  
  return found;
}

export const saveTodo = (todoData, key) => {
  database.saveTodo(todoData, key);
}

const makeTodosObjectToArray = async (user) => {
  const todosObject = await database.getTodos(user.uid);
  let todos = [];
  const todosObjectKeys = Object.keys(todosObject);

  todosObjectKeys.forEach((key) => {
    todos.push({ ...todosObject[key], key: key });
  })

  return todos;
}