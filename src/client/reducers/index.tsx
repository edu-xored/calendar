import { combineReducers } from 'redux';

const reducer = (store = 0, action) => {
  return Object.assign({}, store);
}

export default combineReducers({
  // our reducers go here
  reducer
});
