import { connect } from 'react-redux';
import { Edit } from '../components/Api';
import { add, edit } from '../redux/api';

const mapStateToProps = () => ({
});

export default connect(
  mapStateToProps,
  { add, edit }
)(Edit);
