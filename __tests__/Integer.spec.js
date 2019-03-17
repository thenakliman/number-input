import React from 'react'
import {Integer} from '../src/Integer'
import {shallow} from 'enzyme';

describe('Integer', () => {
  it('should show default value as 0', () => {
    const component = shallow(<Integer onChange={jest.fn()}/>);
    expect(component.state().value).toBe("0")
  })

  it('should show passed positive value to input', () => {
    const value = 103;
    const component = shallow(<Integer onChange={jest.fn()} value={value}/>);
    expect(component.state().value).toBe(value.toString())
  })

  it('should show passed negative value to input', () => {
    const value = -103;
    const component = shallow(<Integer onChange={jest.fn()} value={value}/>);
    expect(component.state().value).toBe(value.toString())
  })

  describe('when input values are entered', () => {
    describe('when input is valid', () => {
      it('should update value in container state on change', () => {
        const component = shallow(<Integer onChange={jest.fn()}/>);
        const newValue = 102;
        component.find('input').simulate('change', {target: {value: newValue}})
        expect(component.state().value).toBe(newValue.toString());
      })

      it('should update value even when onChange is not provided', () => {
        const component = shallow(<Integer/>);
        const newValue = -102;
        component.find('input').simulate('change', {target: {value: newValue}})
        expect(component.state().value).toBe(newValue.toString());
      })

      it('should update value in component to zero on input delete', () => {
        const component = shallow(<Integer onChange={jest.fn()}/>);
        component.find('input').simulate('change', {target: {value: ''}})
        expect(component.state().value).toBe('0');
      })

      it('should update 0- value to -0', () => {
        const component = shallow(<Integer onChange={jest.fn()}/>);
        component.find('input').simulate('change', {target: {value: '0-'}})
        expect(component.state().value).toBe('-0');
      })

      it('should update - value to 0', () => {
        const component = shallow(<Integer onChange={jest.fn()}/>);
        component.find('input').simulate('change', {target: {value: '-'}})
        expect(component.state().value).toBe('0');
      })

      it('should call onChange hook', () => {
        const onChange = jest.fn();

        const component = shallow(
            <Integer onChange={onChange}
                             value={100}
                             onInvalidInput={jest.fn()}/>);

        const newValue = '-1001';
        component.find('input').simulate('change', {target: {value: newValue}})
        expect(onChange).toHaveBeenCalledWith(parseInt(newValue));
      })

      it('should remove leading zero', () => {
        const onChange = jest.fn();

        const component = shallow(
            <Integer onChange={onChange}
                             value={100}
                             onInvalidInput={jest.fn()}/>);

        const newValue = '-0001001';
        component.find('input').simulate('change', {target: {value: newValue}})
        expect(onChange).toHaveBeenCalledWith(-1001);
      })
    })

    describe('when input is invalid', () => {
      it('should not update value on invalid input', () => {
        const value = 100;
        const component = shallow(<Integer onChange={jest.fn()} value={value}/>);
        component.find('input').simulate('change', {target: {value: '1239k'}})
        expect(component.state().value).toBe(value.toString());
      })

      it('should not update value on invalid input in between', () => {
        const value = 100;
        const component = shallow(<Integer onChange={jest.fn()} value={value}/>);
        component.find('input').simulate('change', {target: {value: '1239k432'}})
        expect(component.state().value).toBe(value.toString());
      })

      it('should not update value on invalid input at start', () => {
        const value = 100;
        const component = shallow(<Integer onChange={jest.fn()} value={value}/>);
        component.find('input').simulate('change', {target: {value: '1239k432'}})
        expect(component.state().value).toBe(value.toString());
      })

      it('should not update value on character at start', () => {
        const value = 100;
        const component = shallow(<Integer onChange={jest.fn()} value={value}/>);
        component.find('input').simulate('change', {target: {value: 'k100'}})
        expect(component.state().value).toBe(value.toString());
      })

      it('should call onInvalidInput hook', () => {
        const value = 100;
        const onInvalidInput = jest.fn();

        const component = shallow(
            <Integer onChange={jest.fn()}
                             value={value}
                             onInvalidInput={onInvalidInput}/>);

        component.find('input').simulate('change', {target: {value: '-10k0'}})
        expect(onInvalidInput).toHaveBeenCalledWith('-10k0');
      })
    })
  })
})
