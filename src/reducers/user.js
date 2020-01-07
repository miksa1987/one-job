export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'SET_USER_EMPTY':
      return {};
    default:
      return state;
  }
}