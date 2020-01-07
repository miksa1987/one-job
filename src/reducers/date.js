export default (state = '', action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_DATE':
      return action.data;
    default:
      return state;
  }
}