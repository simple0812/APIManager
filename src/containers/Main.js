import { connect } from 'react-redux';
import Main from '../components/Main';
import { getList as getApiList } from '../redux/api';
import { getList as getTagList } from '../redux/tag';
import { add as addProject, set, getList as getProjectList } from '../redux/project';
import { add as addGroup } from '../redux/group';

const mapStateToProps = (state) => ({
  getTagListResult: state.tag.getListResult,
  addProjectResult: state.project.addResult,
  setProjectResult: state.project.setResult,
  editProjectResult: state.project.editResult,
  getProjectListResult: state.project.getListResult,
  getApiListResult: state.api.getListResult,
  addApiResult: state.api.addResult,
  editApiResult: state.api.editResult,
  delApiResult: state.api.delResult,
  delGroupResult: state.group.delResult,
  delProjectResult: state.project.delResult,
  addGroupResult: state.group.addResult,
  editGroupResult: state.group.editResult,
});

export default connect(
  mapStateToProps,
  { getTagList, getApiList, set, addProject, getProjectList, addGroup }
)(Main);
