import React from 'react';
import { message, Modal, Menu, Dropdown, Input, Tree, Icon, Form } from 'antd';
import { ContextMenuTrigger } from 'react-contextmenu';
import isArray from 'lodash/isArray';
import NavMenu from './NavMenu';
import GroupEdit from '../../containers/GroupEdit';
import ProjectEdit from '../../containers/ProjectEdit';
import './less/nav.less';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: props.selectedKeys,
      status: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    const { selectedKeys } = nextProps;
    if (this.props.selectedKeys !== selectedKeys) {
      this.setState({ selectedKeys });
    }
  }

  handleMenuClick = (e, data) => {
    const { project, id } = data.item;
    if (data.action === 'add_group') {
      this.setState({
        status: 1,
        group: {
          type: project ? 1 : 0,
          project: project || id,
          parent: id
        }
      });
    } else if (data.action === 'edit') {
      if (data.item.project) {
        this.setState({
          status: 2,
          group: data.item
        });
      } else {
        this.setState({
          status: 3,
          project: data.item
        });
      }
    } else if (data.action === 'del') {
      if (data.item.project) {
        this.props.delGroup(data.item);
      } else {
        this.props.delProject(data.item);
      }
    } else if (data.action === 'add_api') {
      this.props.onAddApi({
        parent: id,
        parent_type: project ? 1 : 0,
        project: project || id
      });
    } else if (data.action === 'edit_api') {
      this.props.onEditApi(data.item);
    } else if (data.action === 'del_api') {
      this.props.delApi(data.item);
    }
  }

  handleSave = () => {
    this.setState({ status: 0 });
  }
  handleSelect = (selectedKeys, e) => {
    console.log('handleSelect');
    // console.log(selectedKeys, e.node.props.pos, e.item, e.node);
    this.setState({ selectedKeys });
    const { item, pos, parent } = e.node.props;
    if (item.type) {
      this.props.onSelectApi(item, parent, pos);
    }
    // e.node.props.item
  }
  projectItem = (item) => (
    <ContextMenuTrigger
      id="PROJECT_MENU"
      onItemClick={this.handleMenuClick}
      group={item}
      item={item}
      collect={(props) => (props)}
    >
      {item.showName || item.name}<span style={{ color: '#47494a', float: 'right' }}>{item.version}</span>
    </ContextMenuTrigger>
  );
  renderProject = (data, parent) => {
    if (isArray(data)) {
      return data.map(item => {
        if (item.children && item.children.length) {
          return (
            <TreeNode
              key={item.id}
              parent={parent}
              item={item}
              title={this.projectItem(item)}
            >{this.renderProject(item.children, item)}</TreeNode>);
        }
        return (<TreeNode parent={parent} item={item} key={item.id} title={this.projectItem(item)} />);
      });
    }
    if (data.children && data.children.length) {
      return (
        <TreeNode
          key={data.id}
          parent={parent}
          item={data}
          title={this.projectItem(data)}
        >{this.renderProject(data.children)}</TreeNode>);
    }
    return (<TreeNode key={data.id} parent={parent} item={data} title={this.projectItem(data)} />);
  }
  render() {
    const { projects } = this.props;
    const { selectedKeys, status, group, project } = this.state;
    return (
      <div>
        <Tree
          ref={(tree) => { this.tree = tree; }}
          className="project-tree"
          onSelect={this.handleSelect}
          selectedKeys={selectedKeys}
        >
          {this.renderProject(projects)}
        </Tree>
        <NavMenu />
        {(status === 1 || status === 2) &&
          <GroupEdit group={group} status={status} onSave={this.handleSave} />
        }
        {status === 3 &&
          <ProjectEdit status={2} project={project} onSave={this.handleSave} />
        }
      </div>
    );
  }
}

export default Form.create()(Nav);
