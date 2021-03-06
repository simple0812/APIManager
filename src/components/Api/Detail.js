/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import Markdown from '../Markdown';
import Status from './Status';
import './less/detail.less';

class Detail extends React.Component {
  static propTypes = {
    onSelectTag: PropTypes.func.isRequired,
    getById: PropTypes.func.isRequired,
    getByIdResult: PropTypes.object,
    id: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {};
    if (props.id) {
      this.props.getById({ id: props.id });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id, getByIdResult } = nextProps;
    if (id !== this.props.id) {
      this.props.getById({ id });
    }
    if (getByIdResult !== this.props.getByIdResult) {
      const { api, parent } = getByIdResult.data;
      this.setState({ api, parent });
    }
  }

  handleTagClick = (tag) => {
    this.props.onSelectTag(tag);
  }
  getVersionStatus = (status) => {
    if (status === 1) return <a href="javascript:void(0)" onClick={() => { this.handleTagClick({ version_status: status, name: 'Working Draft' }); }}>Working Draft</a>;
    if (status === 2) return <a href="javascript:void(0)" onClick={() => { this.handleTagClick({ version_status: status, name: 'Candidate Recommendation' }); }}>Candidate Recommendation</a>;
    return <a href="javascript:void(0)" onClick={() => { this.handleTagClick({ version_status: status, name: 'Recommendation' }); }}>Recommendation</a>;
  }
  getName = (api, parent) => {
    if (api.type === 1) return `${api.name}()`;
    if (api.type === 2) return `${parent.name}.${api.name}()`;
    if (api.type === 4) return `${parent.name}.${api.name}`;
    if (api.type === 5) return `${api.name}{}`;
    return api.name;
  }
  getStatus = (status) => {
    if (status === 1) return (<span />);// <img src={require('./images/current.png')} alt="current" />;
    if (status === 2) return <img onClick={() => { this.handleTagClick({ status, name: 'new' }); }} src={require('./images/new.png')} alt="new" />;
    return <img onClick={() => { this.handleTagClick({ status, name: 'deprecated' }); }} src={require('./images/deprecated.png')} alt="deprecated" />;
  };
  render() {
    const { api, parent } = this.state;
    if (!api) return (<div />);
    return (
      <div className="api-detail">
        <div className="header label">
          <div className="header-content">
            <span>{this.getName(api, parent)}</span>
            <span className="tip">{this.getStatus(api.status)}</span>
          </div>
        </div>
        {api.tags &&
          <div className="tag">
            {api.tags.map(tag => (
              <Tag key={tag.id}>
                <a href="javascript:void(0)" onClick={() => { this.handleTagClick(tag); }}>{tag.name}</a>
              </Tag>)
            )}
          </div>
        }
        {api.use &&
          <div className="item">
            <div className="label">使用示例</div>
            <Markdown content={api.use} />
          </div>
        }
        {api.release_status &&
          <div className="item">
            <div className="label">发布状态</div>
            <div className="content">
              {api.release_status}
            </div>
          </div>
        }
        {api.compatibility &&
          <div className="item">
            <div className="label">浏览器兼容性</div>
            <div className="content">
              {Object.keys(api.compatibility).map(item => <span key={item}>{item} {api.compatibility[item]}、</span>)}
            </div>
          </div>
        }
        {api.refer_to &&
          <div className="item">
            <div className="label">参考文献</div>
            <div className="content">
              {api.refer_to}
            </div>
          </div>
        }
        <div className="version-status">
          {this.getVersionStatus(api.version_status)}
          <div className="triangle-up" />
        </div>
      </div>
    );
  }
}

export default Detail;
