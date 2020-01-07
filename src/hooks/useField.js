import { useState } from 'react';

export default (type) => {
  const [ value, setValue ] = useState('');
  const returnedType = (type === 'minutes' || type === 'hours') ? 'number' : type; 

  const onChange = (event) => {
    let value = event.target.value;

    if (type === 'minutes') {
      if (Number(value) < 0)  value = 59;
      if (Number(value) > 59) value = 0;
    }

    if (type === 'hours') {
      if (Number(value) < 0)  value = 23;
      if (Number(value) > 23) value = 0;
    }

    setValue(value);
  };

  const set = (newValue) => setValue(newValue);

  return [ { type: returnedType, value, onChange }, set ];
};