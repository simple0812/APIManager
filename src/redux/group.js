import ReduxReqs from 'redux-reqs';

const reduxReqs = new ReduxReqs({
  prefix: 'GROUP',
  prefixUrl: '/api/group'
});

reduxReqs
  .get('GET_LIST')
  .del('DEL', '/:id')
  .put('EDIT', '/:id')
  .post('ADD');

export const { del, edit, add, getList }
  = reduxReqs.getCreateActions();

export default reduxReqs.getReducers();

export const watchSagas = reduxReqs.getWatchSagas();

