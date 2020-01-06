import React from 'react';
import Form from '../common/Form';
import useField from '../../hooks/useField';
import TodoStore from '../../store/store';

const Loginform = (props) => {
  const [ email, setEmail ] = useField('text');
  const [ password, setPassword ] = useField('password');

  const store = React.useContext(TodoStore);

  const loginUser = async (event) => {
    event.preventDefault();

    await store.loginAndSetUser(email.value, password.value);
    if (!store.error) {
      store.setNotification('Logged in.');
    }
    
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