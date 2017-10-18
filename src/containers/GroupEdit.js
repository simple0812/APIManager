import { connect } from 'react-redux';
import { Edit } from '../components/Group';
import { add, edit } from '../redux/group';

const mapStateToProps = () => ({
});

export default connect(
  mapStateToProps,
  { add, edit }
)(Edit);
