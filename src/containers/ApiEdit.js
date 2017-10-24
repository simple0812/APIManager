import { connect } from 'react-redux';
import { Edit } from '../components/Api';
import { add, edit } from '../redux/api';
import { getList as getTagList } from '../redux/tag';

const mapStateToProps = (state) => ({
  getTagListResult: state.tag.getListResult
});

export default connect(
  mapStateToProps,
  { add, edit, getTagList }
)(Edit);
