import ReduxReqs from 'redux-reqs';
import { beginTask, endTask } from 'redux-nprogress';
import { all } from 'redux-saga/effects';
import { watchSagas as accountSagas } from './account';
import { watchSagas as groupSagas } from './group';
import { watchSagas as apiSagas } from './api';
import { watchSagas as tagSagas } from './tag';
import { watchSagas as uploadSagas } from './upload';
import { watchSagas as projectSagas } from './project';

ReduxReqs.defaults = {
  beforeAction: beginTask(),
  afterAction: endTask(),
};

export default function* rootSaga() {
  yield all([
    ...accountSagas,
    ...groupSagas,
    ...apiSagas,
    ...tagSagas,
    ...uploadSagas,
    ...projectSagas
  ]);
}
