import React, { Component } from 'react'


export class Integer extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value && this.props.value.toString() || '0'};
    this.onChange = this.onChange.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  getValueToDisplay(value) {
    if(value === '' || value === '-')
      return '0';
    else if(value === '0-')
      return '-0';

    return value;
  }

  changeValue(value) {
      const integerValue = parseInt(value);
      const stringValue = (value === '-0'? value: integerValue.toString());
      this.setState({value: stringValue});
      if (typeof this.props.onChange === "function") {
         this.props.onChange(integerValue);
      }
  }

  isInteger(value) {
    const integerRegex = /^-?\d*$/;
    return integerRegex.test(value);
  }

  onChange(event) {
    const value = this.getValueToDisplay(event.target.value);
    if(this.isInteger(value)) {
      this.changeValue(value);
    } else if (typeof this.props.onInvalidInput === "function") {
      this.props.onInvalidInput(event.target.value.toString());
    }
  }

  render() {
    const {onInvalidInput, onChange, ...props} = this.props
    return <input  {...props} value={this.state.value} onChange={this.onChange}/>
  }
}
