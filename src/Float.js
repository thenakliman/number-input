import React, { Component } from 'react'

export class Float extends Component {
  constructor(props) {
    super(props)
    const initialValue = this.props.value && this.props.value.toString()
    this.state = {value: initialValue || '0'}
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  displayValue(value) {
    if (['', '-', '-0'].includes(value)) {
      return value
    } else if (/([.]\d*)$/.test(value)) {
      return value
    }

    return parseFloat(value).toString()
  }

  floatValue(value) {
    if (['', '-'].includes(value)) { return 0 }

    return parseFloat(value)
  }

  changeValue(value) {
    this.setState({value: this.displayValue(value)})
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.floatValue(value))
    }
  }

  onBlurDisplayValue(value) {
    if (['', '-', '-0'].includes(value)) {
      return value
    }

    return parseFloat(value).toString()
  }

  onBlur(event) {
    const value = event.target.value
    const displayValue = this.onBlurDisplayValue(value)
    this.setState({value: displayValue})
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(this.floatValue(value))
    }
  }

  isFloat(value) {
    const precision = this.props.precision || 2
    const floatRegex = new RegExp(`^$|^-?\\d*([.]?\\d{0,${precision}})?$`)
    return floatRegex.test(value)
  }

  onChange(event) {
    const value = event.target.value
    if (this.isFloat(value)) {
      this.changeValue(value)
    } else if (typeof this.props.onInvalidInput === 'function') {
      this.props.onInvalidInput(value)
    }
  }

  render() {
    const {onInvalidInput, onChange, onBlur, precision, ...restOfTheProps} = this.props
    return <input {...restOfTheProps} value={this.state.value} onChange={this.onChange} onBlur={this.onBlur} />
  }
}
