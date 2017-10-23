/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, message } from 'antd';
import ApiEdit from '../../containers/ApiEdit';
import ApiSearch from '../../containers/ApiSearch';
import ApiDetail from '../../containers/ApiDetail';
import ProjectNav from '../../containers/ProjectNav';
import ProjectEdit from '../../containers/ProjectEdit';
import Icon, { add, setting, about, back, export as exportIcon, save } from '../Icon';
import './less/main.less';

const Search = Input.Search;

class Main extends React.Component {
  static propTypes = {
    getProjectList: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      projects: [],
      apiStatus: 0
    };
  }
  componentDidMount() {
    this.props.getProjectList();
    this.props.getApiList();
  }

  componentWillReceiveProps(nextProps) {
    const {
      addProjectResult, getProjectListResult, delApiResult,
      delGroupResult, delProjectResult, addGroupResult, editGroupResult,
      editProjectResult, delProjecttResult, addApiResult, editApiResult,
      getApiListResult
    } = nextProps;
    if (addApiResult !== this.props.addApiResult) {
      this.setState({ apis: addApiResult.data });
    }
    if (addApiResult !== this.props.addApiResult) {
      if (addApiResult.code === 0) {
        message.success('添加API成功！');
        this.setState({
          selectedKeys: [addApiResult.data.api.id],
          apiStatus: 0,
          api: addApiResult.data.api,
          apiParent: addApiResult.data.parent,
        });
        this.props.getProjectList();
      }
    }
    if (editApiResult !== this.props.editApiResult) {
      if (editApiResult.code === 0) {
        message.success('编辑API成功！');
        this.setState({
          selectedKeys: [editApiResult.data.api.id],
          apiStatus: 0,
          api: editApiResult.data.api,
          apiParent: editApiResult.data.parent,
        });
        this.props.getProjectList();
      }
    }
    if (addProjectResult !== this.props.addProjectResult) {
      if (addProjectResult.code === 0) {
        message.success('创建文档成功！');
        this.setState({ visible: false });
        this.props.getProjectList();
      }
    }
    if (getProjectListResult !== this.props.getProjectListResult) {
      this.setState({ projects: getProjectListResult.data });
    }
    if (editProjectResult !== this.props.editProjectResult) {
      if (editProjectResult.code === 0) {
        message.success('编辑项目成功！');
        this.props.getProjectList();
      }
    }
    if (delProjecttResult !== this.props.delProjecttResult) {
      if (delProjecttResult.code === 0) {
        message.success('删除项目成功！');
        this.props.getProjectList();
      }
    }
    if (delApiResult !== this.props.delApiResult) {
      if (delApiResult.code === 0) {
        message.success('删除API成功！');
        this.props.getProjectList();
      }
    }
    if (delGroupResult !== this.props.delGroupResult) {
      if (delGroupResult.code === 0) {
        message.success('删除分组成功！');
        this.props.getProjectList();
      }
    }
    if (delProjectResult !== this.props.delProjectResult) {
      if (delProjectResult.code === 0) {
        message.success('删除项目成功！');
        this.props.getProjectList();
      }
    }
    if (addGroupResult !== this.props.addGroupResult) {
      if (addGroupResult.code === 0) {
        message.success('添加分组成功！');
        this.setState({ selectedKeys: [addGroupResult.data.id] });
        this.props.getProjectList();
      }
    }
    if (editGroupResult !== this.props.editGroupResult) {
      if (editGroupResult.code === 0) {
        message.success('编辑分组成功！');
        this.setState({ selectedKeys: [editGroupResult.data.id] });
        this.props.getProjectList();
      }
    }
  }

  handleSearch = (val) => {
    console.log(val);
  }
  handleAddProjectClick = () => {
    this.setState({ visible: true });
  }

  handleAddApi = (api) => {
    this.setState({ api, apiStatus: 1 });
  }
  handleEditApi = (api) => {
    this.setState({ api, apiStatus: 2 });
  }
  handleSelectApi = (api, parent) => {
    this.setState({ api, apiParent: parent, apiStatus: 0 });
  }
  handleSelectTag = (tag) => {
    this.setState({ tag, apiStatus: 3 });
  }
  handleSearchSelectedApi = (api, parent) => {
    this.setState({ selectedKeys: [api.id], api, apiParent: parent, apiStatus: 0 });
  }
  renderApi = () => {
    const { apiStatus, api, tag } = this.state;
    if (!api) return;
    if (apiStatus === 0) {
      if (api.type) {
        return <ApiDetail id={api.id} onSelectTag={this.handleSelectTag} />;
      }
    } else if (apiStatus === 3) {
      return <ApiSearch tag={tag} onSelected={this.handleSearchSelectedApi} />;
    }
    return <ApiEdit status={apiStatus} api={api} onSave={() => { this.setState({ apiStatus: 0 }) }} />;
  }
  render() {
    const { projects, selectedKeys } = this.state;
    return (
      <div className="main">
        <div className="siderbar">
          <div className="logo">
            <img src={require('./images/logo.png')} alt="logo" />
          </div>
          <div className="nav">
            <div className="search">
              <Search placeholder="搜索信息" onSearch={this.handleSearch} />
            </div>
            <ProjectNav
              selectedKeys={selectedKeys}
              onSelectApi={this.handleSelectApi}
              onAddApi={this.handleAddApi}
              onEditApi={this.handleEditApi}
              onAddGroup={this.handleAddGroup}
              projects={projects}
            />
          </div>
          {this.state.setting ?
            (
              <div className="action">
                <a href="javascript:void(0)"><Icon glyph={save} /></a>
                <a href="javascript:void(0)"><Icon glyph={exportIcon} /></a>
                <a href="javascript:void(0)" onClick={() => this.setState({ setting: false })}><Icon glyph={back} /></a>
              </div>
            ) :
            (
              <div className="action">
                <a href="javascript:void(0)" onClick={this.handleAddProjectClick}><Icon glyph={add} /></a>
                <a href="javascript:void(0)" onClick={() => this.setState({ setting: true })}> <Icon glyph={setting} /></a>
                <a href="javascript:void(0)"><Icon glyph={about} /></a>
              </div>
            )
          }
        </div>
        <div className="main-container">
          {this.renderApi()}
        </div>
        {this.state.visible &&
          <ProjectEdit status={1} onSave={() => { this.setState({ visible: false }); }} />
        }
      </div>
    );
  }
}

export default Form.create()(Main);
