import React from 'react';
import PropTypes from 'prop-types';
import Status from './Status';
import './less/search.less';

class Search extends React.Component {
  static propTypes = {
    tag: PropTypes.object.isRequired,
    getList: PropTypes.func.isRequired,
    getListResult: PropTypes.object,
    getByIdResult: PropTypes.object,
    onSelected: PropTypes.func.isRequired,
    getById: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      tag: props.tag,
      apis: []
    };
  }

  componentWillMount() {
    const { tag } = this.state;
    const condition = {};
    if (tag.id) {
      condition.tag = tag.id;
    } else if (tag.version_status) {
      condition.version_status = tag.version_status;
    } else {
      condition.status = tag.status;
    }
    this.props.getList(condition);
    this.setState({ name: tag.name });
  }

  componentWillReceiveProps(nextProps) {
    const { getListResult, tag, getByIdResult } = nextProps;
    if (getListResult !== this.props.getListResult) {
      this.setState({ apis: getListResult.data });
    }
    if (tag !== this.props.tag) {
      this.setState({ tag });
    }
    if (getByIdResult !== this.props.getByIdResult) {
      const { api, parent } = getByIdResult.data;
      this.props.onSelected(api, parent);
    }
  }
  handleSelectedApi = (api) => {
    this.props.getById(api);
  }
  render() {
    const { apis, name } = this.state;
    return (
      <div className="api-search">
        <div className="header">
          搜索纬度:{name}
        </div>
        {apis.map(item => (
          <div key={item.id} className="item">
            <div className="content">
              <a href="javascript:;" onClick={() => { this.handleSelectedApi(item); }}>{item.name}</a>
              <span className="tip"><Status status={item.status} /></span>
            </div>
            <div className="category">
              {item.project.name}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
