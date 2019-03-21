import React, { Component } from 'react'

import NumberInput from 'number-input-lib';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positiveInteger: '',
      invalidPositiveInteger: '',
      integer: '',
      invalidInteger: '',
      positiveFloat: '',
      invalidPositiveFloat: '',
      float: '',
      invalidFloat: ''
    }
    this.handleInputChanges = this.handleInputChanges.bind(this);
  }

  handleInputChanges(type, value) {
    this.setState({[type]: value})
  }

  getInput(validValue, invalidPositiveIntegerValue, invalidValidValueStateKey, validValueStateKey, type) {
    return (
    <div className={'input-type'}>
      <div>
        <div> value: {validValue} </div>
        <div> last invalid input: {invalidPositiveIntegerValue} </div>
      </div>
      <span className={'input-type-and-input-span'}>
        {type} :
        <NumberInput type={type}
                     onInvalidInput={(value) => this.handleInputChanges(invalidValidValueStateKey, value)}
                     onChange={(value) => this.handleInputChanges(validValueStateKey, value)}/>
      </span>
    </div>)
  }

  render () {
    return (
        <div className={'input-examples'}>
          {this.getInput(this.state.positiveInteger, this.state.invalidPositiveInteger, 'invalidPositiveInteger', 'positiveInteger', 'positive-integer')}
          {this.getInput(this.state.integer, this.state.invalidInteger, 'invalidInteger', 'integer', 'integer')}
          {this.getInput(this.state.positiveFloat, this.state.invalidPositiveFloat, 'invalidPositiveFloat', 'positiveFloat', 'positive-float')}
          {this.getInput(this.state.Float, this.state.invalidFloat, 'invalidFloat', 'float', 'float')}
      </div>
    )
  }
}
