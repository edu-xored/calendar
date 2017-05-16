import { combineReducers } from 'redux';

import  reducerLogin  from './login';

export default combineReducers({
  // our reducers go here
   login: reducerLogin,
});
