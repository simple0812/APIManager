import { connect } from 'react-redux';
import { Edit } from '../components/Project';
import { add, edit } from '../redux/project';

const mapStateToProps = () => ({
});

export default connect(
  mapStateToProps,
  { add, edit }
)(Edit);
