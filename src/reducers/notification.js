const initialState = {
  message: '',
  visible: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.data, visible: true };
    case 'CLEAR_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
}