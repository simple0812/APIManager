import { connect } from 'react-redux';
import { Nav } from '../components/Project';
import { del as delGroup } from '../redux/group';
import { del as delProject } from '../redux/project';
import { del as delApi } from '../redux/api';
import { getList as getTagList } from '../redux/tag';
import { base64Img } from '../redux/upload';

const mapStateToProps = (state) => ({
  getTagListResult: state.tag.getListResult,
  base64ImgResult: state.upload.base64ImgResult,
});

export default connect(
  mapStateToProps,
  { getTagList, base64Img, delApi, delGroup, delProject }
)(Nav);
