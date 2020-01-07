export const setLoading = (loadingState) => {
  return (dispatch) => {
    dispatch({ type: 'SET_LOADING', data: loadingState });
  }
}