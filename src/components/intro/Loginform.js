import React from 'react';
import Form from '../common/Form';
import useField from '../../hooks/useField';
import Firebase from '../../firebase/firebase';
import TodoStore from '../../store';
import store from '../../store';

const Loginform = (props) => {
  const [ email, setEmail ] = useField('text');
  const [ password, setPassword ] = useField('password');

  const store = React.useContext(TodoStore);
  const firebase = React.useContext(Firebase);

  const loginUser = async (event) => {
    event.preventDefault();

    const response = await firebase.loginUser(email.value, password.value);

    const user = {
      uid: response.uid,
      email: response.email,
      refreshtoken: response.refreshToken
    };

    store.setUser(user);
    window.localStorage.setItem('onejob-user', JSON.stringify(user));

    setEmail('');
    setPassword('');
    props.setView('buttons');
  }

  return (
    <Form onSubmit={loginUser}>
      <input id='email' placeholder='Your e-mail' {...email} />
      <input id='password' placeholder='Your password' {...password} />
      <button id='log-in'>Log in</button>
    </Form>
  );
}

export default Loginform;