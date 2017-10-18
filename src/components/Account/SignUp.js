/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { rsa } from '../../utils';
import './less/account.less';

const FormItem = Form.Item;

class SignUp extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    signUp: PropTypes.func.isRequired,
    signUpResult: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      sendEmailCode: '获取验证码'
    };
  }

  componentWillReceiveProps(nextProps) {
    const { signUpResult } = nextProps;
    if (signUpResult !== this.props.signUpResult) {
      if (signUpResult.code !== 0) {
        message.error(signUpResult.message);
      } else {
        this.props.history.push('/signin');
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const password = rsa.encrypt(values.password);

        this.props.signUp({
          password,
          email: values.email
        });
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('您输入的两次密码不一致!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
        }
      },
    };
    return (
      <Form className="account" onSubmit={this.handleSubmit}>
        <div className="logo">
          <img src={require('./images/logo.png')} alt="logo" />
        </div>
        <FormItem
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: '请输入正确的邮箱!' },
              { required: true, message: '请输入邮箱!' }
            ]
          })(<Input placeholder="邮箱" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              { min: 6, message: '密码不能小于6位!' },
              { required: true, message: '请输入密码!' },
              { validator: this.checkConfirm }
            ]
          })(<Input type="password" placeholder="密码" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: '请输入确认密码!' },
              { validator: this.checkPassword }
            ]
          })(<Input type="password" placeholder="确认密码" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">注册</Button>
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ color: '#565656' }}>
          已有帐号，<Link to="/signin">直接登录</Link>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SignUp);
