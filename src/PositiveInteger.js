import React, { Component } from 'react'


export class PositiveInteger extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value && this.props.value.toString() || '0'};
    this.onChange = this.onChange.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  getValueToDisplay(value) {
    if(value === '')
      return '0'

    return value;
  }

  changeValue(value) {
      const positiveInteger = parseInt(value).toString();
      this.setState({value: positiveInteger});
      if (typeof this.props.onChange === "function") {
         this.props.onChange(parseInt(positiveInteger));
      }
  }

  isPositiveInteger(value) {
    const positiveIntegerRegex = /^\d+$/;
    return positiveIntegerRegex.test(value);
  }

  onChange(event) {
    const value = this.getValueToDisplay(event.target.value);
    if(this.isPositiveInteger(value)) {
      this.changeValue(value);
    } else if (typeof this.props.onInvalidInput === "function") {
      this.props.onInvalidInput(event.target.value);
    }
  }

  render() {
    const {onInvalidInput, onChange, ...props} = this.props
    return <input  {...props} value={this.state.value} onChange={this.onChange}/>
  }
}
