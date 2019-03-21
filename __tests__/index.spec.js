import React from 'react';
import NumberInput from '../src/index';
import {shallow} from 'enzyme';

describe('Float', () => {
  it('should return positive integer component on correct type', () => {
    const component = shallow(<NumberInput type='positive-integer'/>);
    expect(component.find('PositiveInteger').length).toBe(1);
  })

  it('should return integer component on correct type', () => {
    const component = shallow(<NumberInput type='integer'/>);
    expect(component.find('Integer').length).toBe(1);
  })

  it('should return positive float component on correct type', () => {
    const component = shallow(<NumberInput type='positive-float'/>);
    expect(component.find('PositiveFloat').length).toBe(1);
  })

  it('should return float component on correct type', () => {
    const component = shallow(<NumberInput type='float'/>);
    expect(component.find('Float').length).toBe(1);
  })

  it('should not return on invalid type', () => {
    const component = shallow(<NumberInput type='invalid-type'/>);
    expect(component).toEqual({});
  })
})
