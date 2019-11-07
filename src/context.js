import React from 'react';
import createStore from './store';
import { useLocalStore } from 'mobx-react-lite';

export const storeContext = React.createContext(null);

const StoreProvider = (props) => {
  const store = useLocalStore(createStore);

  return (
    <storeContext.Provider value={store}>
      {props.children}
    </storeContext.Provider>
  );
}

export default StoreProvider;