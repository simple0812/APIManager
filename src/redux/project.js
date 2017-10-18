import ReduxReqs from 'redux-reqs';
import toTree from '../utils/toTree';

const reduxReqs = new ReduxReqs({
  prefix: 'PROJECT',
  prefixUrl: '/api/project'
});


const getName = (api, parent) => {
  if (api.type === 1) return `${api.name}()`;
  if (api.type === 2) return `${parent.name}.${api.name}()`;
  if (api.type === 4) return `${parent.name}.${api.name}`;
  if (api.type === 5) return `${api.name}{}`;
  return api.name;
}
reduxReqs
  .get('GET_LIST', '', {
    processResult: (res) => {
      const { projects, groups, apis } = res.data;
      const result = [];
      groups.forEach(item => {
        const nodes = [];
        apis.forEach(api => {
          if (api.parent === item.id && api.parent_type === 1) {
            nodes.push({ ...api, showName: getName(api, item) });
          }
        });
        item.children = nodes;// eslint-disable-line no-param-reassign
      });
      projects.forEach(item => {
        const nodes = [];
        groups.forEach(group => {
          if (group.project === item.id) {
            nodes.push(group);
          }
        });
        apis.forEach(api => {
          if (api.parent === item.id && api.parent_type === 0) {
            nodes.push({ ...api, showName: getName(api, item) });
          }
        });
        result.push({
          ...item,
          type: 0,
          children: toTree(nodes, item.id)
        });
      });
      return { ...res, data: result, source: res.data };
    }
  })
  .del('DEL', '/:id')
  .put('EDIT', '/:id')
  .post('ADD');

export const { del, edit, add, getList }
  = reduxReqs.getCreateActions();

export default reduxReqs.getReducers();

export const watchSagas = reduxReqs.getWatchSagas();

