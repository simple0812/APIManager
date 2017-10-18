import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem, connectMenu } from 'react-contextmenu';

const GroupMenu = (props) => {
  const { id, trigger } = props;
  const handleItemClick = trigger ? trigger.onItemClick : null;
  if (trigger && trigger.item.type) {
    return (
      <ContextMenu id={id}>
        <MenuItem data={{ action: 'edit_api' }} onClick={handleItemClick}>编辑</MenuItem>
        <MenuItem onClick={handleItemClick} data={{ action: 'del_api' }}>删除</MenuItem>
      </ContextMenu>
    );
  }
  return (
    <ContextMenu id={id}>
      <MenuItem onClick={handleItemClick} data={{ action: 'add_api' }}>添加API</MenuItem>
      <MenuItem onClick={handleItemClick} data={{ action: 'add_group' }}>添加分组</MenuItem>
      <MenuItem data={{ action: 'edit' }} onClick={handleItemClick}>编辑</MenuItem>
      <MenuItem data={{ action: 'del' }} onClick={handleItemClick}>
        删除
      </MenuItem>
    </ContextMenu>
  );
};

GroupMenu.propTypes = {
  id: PropTypes.string.isRequired,
  trigger: PropTypes.object
};

export default connectMenu('PROJECT_MENU')(GroupMenu);
