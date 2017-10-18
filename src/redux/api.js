import ReduxReqs from 'redux-reqs';

const reduxReqs = new ReduxReqs({
  prefix: 'API',
  prefixUrl: '/api/api'
});

reduxReqs
  .get('GET_LIST')
  .get('GET_BY_ID', '/:id')
  .del('DEL', '/:id')
  .put('EDIT', '/:id')
  .post('ADD');

export const { del, add, edit, getById, getList }
  = reduxReqs.getCreateActions();

export default reduxReqs.getReducers();

export const watchSagas = reduxReqs.getWatchSagas();

