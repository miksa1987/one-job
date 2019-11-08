import React from 'react';
import Form from '../common/Form';
import useField from '../../hooks/useField';
import Firebase from '../../firebase/firebase';
import TodoStore from '../../store';

const NewUserform = (props) => {
  const [ email, setEmail ] = useField('text');
  const [ password, setPassword ] = useField('password');
  const [ repeatPassword, setRepeatPassWord ] = useField('password');

  const store = React.useContext(TodoStore);
  const firebase = React.useContext(Firebase);

  const createUser = async (event) => {
    event.preventDefault();
    const response = await firebase.createNewUser(email.value, password.value);

    const user = {
      uid: response.uid,
      email: response.email,
      refreshtoken: response.refreshToken
    };

    store.setUser(user);
    window.localStorage.setItem('onejob-user', JSON.stringify(user));

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

export default NewUserform;