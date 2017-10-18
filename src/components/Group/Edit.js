import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Form, Button } from 'antd';

const FormItem = Form.Item;

class Edit extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    status: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    edit: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSaveGroupClick = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { group, status } = this.props;
        if (status === 2) {
          this.props.edit({ ...group, ...values });
        } else {
          this.props.add({ ...values, ...group });
        }
        this.props.form.resetFields();
        this.props.onSave();
      }
    });
  }

  render() {
    const { status, group } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <div>
        <Modal
          title={status === 1 ? '创建分组' : '编辑分组'}
          visible
          footer={null}
          onOk={this.handleSaveGroupClick}
          onCancel={() => { this.props.onSave(); }}
        >
          <Form>
            <FormItem
              label="分组名称"
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '分组名称必须填写' }],
                initialValue: status === 2 ? group.name : ''
              })(<Input />)}
            </FormItem>
            <FormItem>
              <Button className="save" onClick={this.handleSaveGroupClick}>保存</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Edit);
