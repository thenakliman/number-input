import React, { Component } from 'react'


export class PositiveInteger extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value && this.props.value.toString() || '0'};
    this.onChange = this.onChange.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  getValue(value) {
    if(value === '')
      return '0'

    return value;
  }

  setValue(value) {
      const positiveInteger = parseInt(value).toString();
      this.setState({value: positiveInteger});
      this.props.onChange(parseInt(positiveInteger));
  }

  onChange(event) {
    const positiveIntegerRegex = /^\d+$/;
    const value = this.getValue(event.target.value);
    if(positiveIntegerRegex.test(value)) {
      this.setValue(value);
    } else if (typeof this.props.onInvalidInput === "function") {
      this.props.onInvalidInput(event.target.value);
    }
  }

  render() {
    return (
        <input  {...this.props} value={this.state.value} onChange={this.onChange}/>
    )
  }
}
