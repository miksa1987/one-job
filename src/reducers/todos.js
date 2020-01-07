import moment from 'moment';

const initialState = {
  all: [],
  current: { task: '', reflect: '', date: moment().format('YYYY-MM-DD') }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_TODOS':
      return { ...state, all: action.data };
    case 'SET_CURRENT_TODO':
      return { ...state, current: action.data };
    default:
      return state;
  }
}