import React, { Component } from 'react'

export class PositiveFloat extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value && this.props.value.toString() || "0"};
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  getStringValue(value) {
      if(value === '') {
        return value;
      }

      return /([.]\d*)$/.test(value)? value: parseFloat(value).toString();
  }

  getFloatValue(value) {
    if(value === '')
        return 0;

    return parseFloat(value);
  }

  changeValue(value) {
      const stringValue = this.getStringValue(value);
      this.setState({value: stringValue});
      if (typeof this.props.onChange === "function") {
        this.props.onChange(this.getFloatValue(value));
      }
  }

  onBlur(event) {
      const floatValue = this.getFloatValue(event.target.value);
      this.setState({value: floatValue.toString()});
      if (typeof this.props.onBlur === "function") {
          this.props.onBlur(floatValue);
      }
  }

  isPositiveFloat(value) {
    const precision = this.props.precision || 2;
    const positiveFloatRegex = new RegExp(`^$|^\\d+([.]?\\d{0,${precision}})?$`);
    return positiveFloatRegex.test(value);
  }

  onChange(event) {
    const value = event.target.value;
    if(this.isPositiveFloat(value)) {
      this.changeValue(value);
    } else if (typeof this.props.onInvalidInput === "function") {
      this.props.onInvalidInput(event.target.value);
    }
  }

  render() {
    const {onInvalidInput, onChange, onBlur, precision, ...restOfTheProps} = this.props
    return <input  {...restOfTheProps} value={this.state.value} onChange={this.onChange} onBlur={this.onBlur}/>
  }
}
