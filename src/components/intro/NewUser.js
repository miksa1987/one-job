import React from 'react';
import Form from '../common/Form';
import useField from '../../hooks/useField';
import { connect } from 'react-redux';
import { createAndSetUser } from '../../actions/user';
import { setNotification } from '../../actions/notification';

const NewUserform = (props) => {
  const [ email, setEmail ] = useField('text');
  const [ password, setPassword ] = useField('password');
  const [ repeatPassword, setRepeatPassWord ] = useField('password');

  const createUser = async (event) => {
    event.preventDefault();
    props.createAndSetUser(email.value, password.value, repeatPassword.value);
    props.setNotification('User created. You are now logged in.');

    setEmail('');
    setPassword('');
    setRepeatPassWord('');
    props.setView('buttons');
  }


  return (
    <div>
    <Form onSubmit={createUser}>
      <input id='email' placeholder='Your e-mail' {...email} />
      <input id='password' placeholder='Desired password' {...password} />
      <input id='repeat-password' placeholder='Repeat password' {...repeatPassword} />
      <button id='create-user' type='submit'>
        Create new user
      </button>
    </Form>
    </div>
  );
}

export default connect(null, { createAndSetUser, setNotification })(NewUserform);