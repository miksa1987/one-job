import database from '../database/database';

export const createAndSetUser = (email, password, repeatPassword) => {
  return async (dispatch) => {
    if (password !== repeatPassword) {
      throw new Error('Passwords do not match');
    }

    const response = await database.loginUser(email, password);
    const currentUser = {
      uid: response.uid, 
      email: response.email,
      refreshtoken: response.refreshtoken
    };

    window.localStorage.setItem('onejob-user', JSON.stringify(currentUser));
    dispatch({ type: 'SET_USER', data: currentUser });
  }
} 

export const loginAndSetUser = (email, password) => {
  return async (dispatch) => {
    const response = await database.loginUser(email, password);
    const currentUser = {
      uid: response.uid, 
      email: response.email,
      refreshtoken: response.refreshtoken
    };

    window.localStorage.setItem('onejob-user', JSON.stringify(currentUser));
    dispatch({ type: 'SET_USER', data: currentUser });
  }
}

export const logoutUser = async () => {
  return async (dispatch) => {
    await database.logoutUser();
    window.localStorage.clear();

    dispatch({ type: 'SET_USER', data: {} });
  }
}

export const setUser = (user) => {
  return (dispatch) => {
    dispatch({ type: 'SET_USER', data: user });
  }
}