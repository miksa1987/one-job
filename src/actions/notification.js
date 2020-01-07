export const setNotification = (message) => {
  return (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', data: message });

    setTimeout(() => {    
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 3000);
  }
}