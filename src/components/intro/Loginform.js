import React from 'react';
import Form from '../common/Form';
import useField from '../../hooks/useField';
import { connect } from 'react-redux';
import { loginAndSetUser } from '../../actions/user';
import { setNotification } from '../../actions/notification';

const Loginform = (props) => {
  const [ email, setEmail ] = useField('text');
  const [ password, setPassword ] = useField('password');

  const loginUser = async (event) => {
    event.preventDefault();

    props.loginAndSetUser(email.value, password.value);
    props.setNotification('Logged in.');

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

export default connect(null, { loginAndSetUser, setNotification})(Loginform);