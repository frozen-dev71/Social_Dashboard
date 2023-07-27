import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import checkedReducer from './checkedReducer';
import updateReducer from './updateReducer';
import getReducer from './getReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  checked: checkedReducer,
  errors: errorReducer,
  update: updateReducer,
  get: getReducer,
});

export default rootReducer;