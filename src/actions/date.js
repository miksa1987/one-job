export const setDate = (date) => {
  return (dispatch) => {
    dispatch({ type: 'SET_DATE', data: date });
  }
}