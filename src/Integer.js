import React, { Component } from 'react'

export class Integer extends Component {
  constructor(props) {
    super(props)
    const initialValue = this.props.value && this.props.value.toString()
    this.state = {value: initialValue || '0'}
    this.onChange = this.onChange.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  integerValue(value) {
    if (value === '-') {
      return -0
    } else if (value === '') {
      return 0
    }

    return parseInt(value)
  }

  displayValue(value) {
    if (['-0', '-', ''].includes(value)) {
      return value
    }
    return parseInt(value).toString()
  }

  changeValue(value) {
    const integerValue = this.integerValue(value)
    const stringValue = this.displayValue(value)
    this.setState({value: stringValue})
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(integerValue)
    }
  }

  isInteger(value) {
    const integerRegex = /^-?\d*$/
    return integerRegex.test(value)
  }

  onChange(event) {
    const newValue = event.target.value
    if (this.isInteger(newValue)) {
      this.changeValue(newValue)
    } else if (typeof this.props.onInvalidInput === 'function') {
      this.props.onInvalidInput(newValue.toString())
    }
  }

  render() {
    const {onInvalidInput, onChange, ...props} = this.props
    return <input {...props} value={this.state.value} onChange={this.onChange} />
  }
}
