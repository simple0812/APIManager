/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, message, AutoComplete, Checkbox } from 'antd';
import ApiEdit from '../../containers/ApiEdit';
import ApiSearch from '../../containers/ApiSearch';
import ApiDetail from '../../containers/ApiDetail';
import ProjectNav from '../../containers/ProjectNav';
import ProjectEdit from '../../containers/ProjectEdit';
import Icon, { add, setting as setIcon, about, back, export as exportIcon, save } from '../Icon';
import './less/main.less';

const Search = Input.Search;
const Option = AutoComplete.Option;
const CheckboxGroup = Checkbox.Group;

class Main extends React.Component {
  static propTypes = {
    getProjectList: PropTypes.func.isRequired,
    getApiList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      projects: [],
      apiStatus: 0,
      apis: []
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
      getApiListResult, setProjectResult
    } = nextProps;
    if (setProjectResult !== this.props.setProjectResult) {
      message.success('设置成功！');
      this.props.getProjectList();
    }
    if (getApiListResult !== this.props.getApiListResult) {
      this.setState({ apis: getApiListResult.data });
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
        this.props.getApiList();
      }
    }
    if (editApiResult !== this.props.editApiResult) {
      if (editApiResult.code === 0) {
        message.success('编辑API成功！');
        this.setState({
          selectedKeys: [editApiResult.data.api.id],
          apiStatus: 0,
          apiId: editApiResult.data.api.id,
          // api: editApiResult.data.api,
          // apiParent: editApiResult.data.parent,
        });
        this.props.getProjectList();
        this.props.getApiList();
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
      const projectOptions = [];
      const projectSelected = [];
      getProjectListResult.source.projects.forEach(item => {
        projectOptions.push({ label: item.name, value: item.id });
        if (!item.hide) {
          projectSelected.push(item.id);
        }
      });
      this.setState({ projects: getProjectListResult.data, projectOptions, projectSelected });
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
        this.props.getApiList();
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
    this.setState({ condition: val });
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
    this.setState({ selectedKeys: [api.id], apiId: api.id, api, apiParent: parent, apiStatus: 0 });
  }
  handleSelect = (val) => {
    this.setState({ selectedKeys: [val], apiId: val, apiStatus: 0 });
  }
  handleProjectSetChange = (val) => {
    this.setState({ projectSelected: val });
  }
  handleSetClick = () => {
    const { projectSelected } = this.state;
    this.props.set({ ids: projectSelected });
    this.setState({ setting: false });
  }
  renderApi = () => {
    const { apiStatus, api, tag, apiId } = this.state;
    if (!api && !apiId) return;
    if (apiStatus === 0) {
      return <ApiDetail id={apiId || api.id} onSelectTag={this.handleSelectTag} />;
    } else if (apiStatus === 3) {
      return <ApiSearch tag={tag} onSelected={this.handleSearchSelectedApi} />;
    }
    return <ApiEdit status={apiStatus} api={api} onCancel={() => { this.setState({ apiStatus: 0 }); }} />;
  }
  render() {
    const { projects, selectedKeys, apis, condition, setting, projectOptions, projectSelected } = this.state;
    const options = [];
    if (condition && condition.length > 0) {
      apis.forEach(item => {
        if (item.name.indexOf(condition) !== -1) {
          options.push(<Option key={item.id}>{item.name}</Option>);
        }
      });
    }

    return (
      <div className="main">
        <div className="siderbar">
          <div className="logo">
            <img src={require('./images/logo.png')} alt="logo" />
          </div>
          <div className="nav">
            <div className="search">
              <AutoComplete
                style={{ width: '100%' }}
                dataSource={options}
                onSelect={this.handleSelect}
                onSearch={this.handleSearch}
              >
                <Search placeholder="搜索信息" />
              </AutoComplete>
            </div>
            {setting ?
              (
                <div className="setting">
                  <CheckboxGroup options={projectOptions} value={projectSelected} onChange={this.handleProjectSetChange} />
                </div>
              ) :
              (
                <ProjectNav
                  selectedKeys={selectedKeys}
                  onSelectApi={this.handleSelectApi}
                  onAddApi={this.handleAddApi}
                  onEditApi={this.handleEditApi}
                  onAddGroup={this.handleAddGroup}
                  projects={projects}
                />
              )}
          </div>
          {setting ?
            (
              <div className="action">
                <a href="javascript:void(0)" onClick={this.handleSetClick}><Icon glyph={save} /></a>
                <a href="javascript:void(0)"><Icon glyph={exportIcon} /></a>
                <a href="javascript:void(0)" onClick={() => this.setState({ setting: false })}><Icon glyph={back} /></a>
              </div>
            ) :
            (
              <div className="action">
                <a href="javascript:void(0)" onClick={this.handleAddProjectClick}><Icon glyph={add} /></a>
                <a href="javascript:void(0)" onClick={() => this.setState({ setting: true })}> <Icon glyph={setIcon} /></a>
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
