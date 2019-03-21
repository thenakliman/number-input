import React from 'react'
import {PositiveInteger} from './PositiveInteger'
import {PositiveFloat} from './PositiveFloat'
import {Float} from './Float'
import {Integer} from './Integer'

export default function NumberInput(props) {
  const {type, ...restOfTheProps} = props

  switch (type) {
    case 'positive-integer':
      return <PositiveInteger {...restOfTheProps} />
    case 'integer':
      return <Integer {...restOfTheProps} />
    case 'positive-float':
      return <PositiveFloat {...restOfTheProps} />
    case 'float':
      return <Float {...restOfTheProps} />
  }
}
