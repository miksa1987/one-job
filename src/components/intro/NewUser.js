import React from 'react';
import Form from '../common/Form';
import useField from '../../hooks/useField';
import TodoStore from '../../store/store';

const NewUserform = (props) => {
  const [ email, setEmail ] = useField('text');
  const [ password, setPassword ] = useField('password');
  const [ repeatPassword, setRepeatPassWord ] = useField('password');

  const store = React.useContext(TodoStore);

  const createUser = async (event) => {
    event.preventDefault();
    store.createAndSetUser(email.value, password.value, repeatPassword.value);
    store.setNotification('User created. You are now logged in.');

    setEmail('');
    setPassword('');
    setRepeatPassWord('');
    props.setView('buttons');
  };


  return (
    <Form onSubmit={createUser}>
      <input id='email' placeholder='Your e-mail' {...email} />
      <input id='password' placeholder='Desired password' {...password} />
      <input id='repeat-password' placeholder='Repeat password' {...repeatPassword} />
      <button id='create-user' type='submit'>
        Create new user
      </button>
    </Form>
  );
};

export default NewUserform;