import React from 'react';
import { Select, Form, Input, Radio, Button } from 'antd';
import PropTyeps from 'prop-types';
import Compatibility from '../Compatibility';
import './less/edit.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;

class Edit extends React.Component {
  static propTypes = {
    form: PropTyeps.object.isRequired,
    api: PropTyeps.object.isRequired,
    status: PropTyeps.number.isRequired,
    add: PropTyeps.func.isRequired,
    edit: PropTyeps.func.isRequired,
    onCancel: PropTyeps.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      api: props.api,
      apiTags: props.api && props.api.tags ? props.api.tags.map(item => (item.name)) : []
    };
  }

  componentDidMount() {
    this.props.getTagList();
  }
  componentWillReceiveProps(nextProps) {
    const { getTagListResult, api } = nextProps;
    if (getTagListResult !== this.props.getTagListResult) {
      this.setState({ tags: getTagListResult.data });
    }
    if (api !== this.props.api) {
      const apiTags = api.tags.map(item => (item.name));
      this.setState({ api, apiTags });
    }
  }

  handleSaveClick = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { api, status } = this.props;
        if (status === 1) {
          this.props.add({
            ...values,
            ...api
          });
        } else {
          this.props.edit({
            ...api,
            ...values
          });
        }
        // this.props.onSave();
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { status } = this.props;
    const { tags, api, apiTags } = this.state;

    return (
      <div className="api-edit">
        <Form>
          <FormItem
            className="title"
            label={status === 1 ? '创建API' : '编辑API'}
            colon={false}
            {...formItemLayout}
          />
          <FormItem
            label="API名称"
            {...formItemLayout}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'API名称必须填写' }],
              initialValue: status === 2 ? api.name : ''
            })(<Input />)}
          </FormItem>
          <FormItem
            label="API类型"
            {...formItemLayout}
          >
            {getFieldDecorator('type', {
              rules: [{ required: true, message: 'API类型必须填写' }],
              initialValue: status === 2 ? api.type : 1
            })(
              <RadioGroup>
                <Radio value={1}>原型方法</Radio>
                <Radio value={2}>静态方法</Radio>
                <Radio value={3}>原型属性</Radio>
                <Radio value={4}>静态属性</Radio>
                <Radio value={5}>对象</Radio>
              </RadioGroup>)}
          </FormItem>
          <FormItem
            label="Tags"
            {...formItemLayout}
          >
            {getFieldDecorator('tags', {
              initialValue: apiTags
            })(
              <Select mode="tags">
                {tags.map(tag => <Option key={tag.id} value={tag.name}>{tag.name}</Option>)}
              </Select>)}
          </FormItem>
          <FormItem
            label="API状态"
            {...formItemLayout}
          >
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '库版本必须填写' }],
              initialValue: status === 2 ? api.status : 1
            })(<RadioGroup>
              <Radio value={1}>当前(current)</Radio>
              <Radio value={2}>新增(new)</Radio>
              <Radio value={3}>废弃(deprecated)</Radio>
            </RadioGroup>)}
          </FormItem>
          <FormItem
            label="用法"
            {...formItemLayout}
          >
            {getFieldDecorator('use', {
              initialValue: status === 2 ? api.use : ''
            })(<TextArea rows={8} />)}
          </FormItem>
          <FormItem
            label="文档成熟度"
            {...formItemLayout}
          >
            {getFieldDecorator('version_status', {
              rules: [{ required: true, message: '文档成熟度必须填写' }],
              initialValue: status === 2 ? api.version_status : 1
            })(
              <RadioGroup>
                <Radio style={radioStyle} value={1}>工作草案(WD，Working Draft)</Radio>
                <Radio style={radioStyle} value={2}>候选推荐(CR，Candidate Recommendation)</Radio>
                <Radio style={radioStyle} value={3}>推荐(REC，Recommendation)</Radio>
              </RadioGroup>)}
          </FormItem>
          <FormItem
            label="发布状态"
            {...formItemLayout}
          >
            {getFieldDecorator('release_status', {
              initialValue: status === 2 ? api.release_status : ''
            })(<Input />)}
          </FormItem>
          <FormItem
            label="兼容性"
            {...formItemLayout}
          >
            {getFieldDecorator('compatibility', {
              initialValue: status === 2 ? api.compatibility : {
                chrome: 'latest',
                firefox: 'latest',
                safari: 'latest',
                ie: '9+',
              }
            })(<Compatibility />)}
          </FormItem>
          <FormItem
            label="参考文献"
            {...formItemLayout}
          >
            {getFieldDecorator('refer_to', {
              initialValue: status === 2 ? api.refer_to : ''
            })(<TextArea rows={8} />)}
          </FormItem>

          <FormItem
            label=" "
            colon={false}
            {...formItemLayout}
          >
            <Button className="save" onClick={this.handleSaveClick} type="primary">保存</Button>
            <Button className="cancel" onClick={this.props.onCancel}>取消</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Edit);
