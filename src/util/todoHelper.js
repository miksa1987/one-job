export const getHoursAndMinutesFromTodo = (currentTodo) => {
  const hours = currentTodo.time ? currentTodo.time[0] : 12;
  const minutes = currentTodo.time ? currentTodo.time[1] : 0;

  return [ hours, minutes ];
};