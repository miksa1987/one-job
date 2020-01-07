import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import todosReducer from './reducers/todos';
import userReducer from './reducers/user';
import notificationReducer from './reducers/notification';
import loadingReducer from './reducers/loading';
import dateReducer from './reducers/date';

const reducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
  notification: notificationReducer,
  loading: loadingReducer,
  date: dateReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;