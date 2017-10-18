import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import Icon, { chrome, firefox, safari, explorer } from '../Icon';
import './less/compatibility.less';

class Compatibility extends React.Component {
  static propTypes = {
    value: PropTypes.shape(),
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: () => { }
  }

  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      value
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setState({ value });
    }
  }

  handleChange = (e) => {
    const value = { ...this.state.value };
    value[e.target.name] = e.target.value;
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    const { value } = this.state;
    return (
      <div className="input-group-compatibility">
        <Input name="chrome" value={value.chrome} onChange={this.handleChange} addonBefore={<Icon glyph={chrome} />} />
        <Input name="firefox" value={value.firefox} onChange={this.handleChange} addonBefore={<Icon glyph={firefox} />} />
        <Input name="safari" value={value.safari} onChange={this.handleChange} addonBefore={<Icon glyph={safari} />} />
        <Input name="ie" value={value.ie} onChange={this.handleChange} addonBefore={<Icon glyph={explorer} />} />
      </div>
    );
  }
}

export default Compatibility;
