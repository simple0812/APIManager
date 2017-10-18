import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { nprogress } from 'redux-nprogress';
import account from './account';
import group from './group';
import api from './api';
import tag from './tag';
import upload from './upload';
import project from './project';

export default combineReducers({
  account,
  group,
  api,
  tag,
  upload,
  project,
  nprogress,
  router: routerReducer,
});
