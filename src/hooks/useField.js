import { useState } from 'react';

export default (type) => {
  const [ value, setValue ] = useState('');

  const onChange = (event) => setValue(event.target.value);
  const set = (newValue) => setValue(newValue);

  return [ { type, value, onChange }, set ];
}