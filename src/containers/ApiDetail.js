import { connect } from 'react-redux';
import { Detail } from '../components/Api';
import { getList, getById } from '../redux/api';

const mapStateToProps = (state) => ({
  getListResult: state.api.getListResult,
  getByIdResult: state.api.getByIdResult,
});

export default connect(
  mapStateToProps,
  { getList, getById }
)(Detail);
