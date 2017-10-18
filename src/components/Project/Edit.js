import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Form, Button } from 'antd';

const FormItem = Form.Item;

class Edit extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    status: PropTypes.number.isRequired,
    project: PropTypes.object,
    edit: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSaveProjectClick = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { status, project } = this.props;
        if (status === 1) {
          this.props.add(values);
        } else {
          this.props.edit({ id: project.id, ...values });
        }
        this.props.onSave();
      }
    });
  }

  render() {
    const { status, project } = this.props;
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
          title={status === 1 ? '创建文档' : '编辑文档'}
          visible
          onOk={this.handleSaveProjectClick}
          footer={null}
          onCancel={() => { this.props.onSave(); }}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="从属语言"
              {...formItemLayout}
            >
              {getFieldDecorator('language', {
                rules: [{ required: true, message: '从属语言必须填写' }],
                initialValue: status === 2 ? project.language : ''
              })(<Input />)}
            </FormItem>
            <FormItem
              label="库名称"
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '库名称必须填写' }],
                initialValue: status === 2 ? project.name : ''
              })(<Input />)}
            </FormItem>
            <FormItem
              label="库版本"
              {...formItemLayout}
            >
              {getFieldDecorator('version', {
                rules: [{ required: true, message: '库版本必须填写' }],
                initialValue: status === 2 ? project.version : ''
              })(<Input />)}
            </FormItem>
            <FormItem>
              <Button className="save" onClick={this.handleSaveProjectClick}>保存</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Edit);
