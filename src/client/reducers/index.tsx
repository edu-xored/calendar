import { combineReducers } from 'redux';

import loginReducer  from './login';
import tableViewReducer from './tableview';

const reducer = (store = 0, action) => {
  return Object.assign({}, store);
};

export default combineReducers({
  // our reducers go here
   teamsPage: tableViewReducer,
   login: loginReducer,
   reducer: reducer
});