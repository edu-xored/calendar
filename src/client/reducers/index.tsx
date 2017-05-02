import { combineReducers } from 'redux';

import  reducerLogin  from './login'

const reducer = (store = 0, action) => {
  return Object.assign({}, store);
}

export default combineReducers({
  // our reducers go here
   login: reducerLogin,
   reducer: reducer
});
