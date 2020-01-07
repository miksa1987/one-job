import { decorate, observable } from 'mobx';

class UserHandler {
  currentUser = { username: '' };

  constructor(database) {
    this.database = database;
  }

  createAndSetUser = async (email, password, repeatPassword) => {
    if (password !== repeatPassword) {
      throw new Error('Passwords do not match');
    }

    const response = await this.database.loginUser(email, password);
    const currentUser = {
      uid: response.uid, 
      email: response.email,
      refreshtoken: response.refreshtoken
    };

    window.localStorage.setItem('onejob-user', JSON.stringify(currentUser));
    this.currentUser = currentUser;
  } 

  loginAndSetUser = async (email, password) => {
    const response = await this.database.loginUser(email, password);
    const currentUser = {
      uid: response.uid, 
      email: response.email,
      refreshtoken: response.refreshtoken
    };

    window.localStorage.setItem('onejob-user', JSON.stringify(currentUser));
    this.currentUser = currentUser;
  }

  logoutUser = async () => {
    await this.database.logoutUser();
    window.localStorage.clear();

    this.currentUser = {};
  }

  setUser = (user) => {
    this.currentUser = user;
  }

  getCurrentUser = () => {
    return this.currentUser;
  }
}

decorate(UserHandler, {
  currentUser: observable
});

export default UserHandler;