import React from 'react'
import {PositiveFloat} from '../src/PositiveFloat'
import {shallow} from 'enzyme';

describe('PositiveFloat', () => {
  it('should show default value as 0', () => {
    const component = shallow(<PositiveFloat onChange={jest.fn()}/>);
    expect(component.state().value).toBe("0")
  })

  it('should show passed value to input', () => {
    const value = 103.2;
    const component = shallow(<PositiveFloat onChange={jest.fn()} value={value}/>);
    expect(component.state().value).toBe(value.toString())
  })

  describe('when input values are entered', () => {
    describe('when input is valid', () => {
      it('should update value in container state on change', () => {
        const component = shallow(<PositiveFloat onChange={jest.fn()}/>);
        const newValue = 102.4;
        component.find('input').simulate('change', {target: {value: newValue}})
        expect(component.state().value).toBe(newValue);
      })

      it('should update value when ending with dot', () => {
        const component = shallow(<PositiveFloat onChange={jest.fn()}/>);
        const newValue = '102.';
        component.find('input').simulate('change', {target: {value: newValue}})
        expect(component.state().value).toBe(newValue);
      })

      it('should update value and remove 0 after decimal', () => {
        const component = shallow(<PositiveFloat onChange={jest.fn()}/>);
        const newValue = '102.000';
        component.find('input').simulate('blur', {target: {value: newValue}})
        expect(component.state().value).toBe('102');
      })

      it('should update value to zero on empty string', () => {
        const component = shallow(<PositiveFloat onChange={jest.fn()}/>);
        component.find('input').simulate('blur', {target: {value: ''}})
        expect(component.state().value).toBe('0');
      })

      it('should call on blur when provided and event is fired', () => {
        const onBlur = jest.fn();
        const component = shallow(<PositiveFloat onChange={jest.fn()} onBlur={onBlur}/>);
        component.find('input').simulate('blur', {target: {value: ''}})
        expect(onBlur).toHaveBeenCalledWith(0);
      })

      it('should show 0 when empty string and blur event', () => {
        const onBlur = jest.fn();
        const component = shallow(<PositiveFloat onChange={jest.fn()} onBlur={onBlur}/>);
        component.find('input').simulate('blur', {target: {value: ''}})
        expect(component.state().value).toBe('0');
      })

      it('should call on change value with 0 on empty string', () => {
        const onChange = jest.fn()
        const component = shallow(<PositiveFloat onChange={onChange} value={213}/>);
        component.find('input').simulate('change', {target: {value: ''}})
        expect(onChange).toHaveBeenCalledWith(0);
      })

      it('should update value even when onChange is not provided', () => {
        const component = shallow(<PositiveFloat/>);
        const newValue = 102;
        component.find('input').simulate('change', {target: {value: newValue}})
        expect(component.state().value).toBe(newValue.toString());
      })

      it('should update value in component to empty string on input delete', () => {
        const component = shallow(<PositiveFloat onChange={jest.fn()}/>);
        component.find('input').simulate('change', {target: {value: ''}})
        expect(component.state().value).toBe('');
      })

      it('should call onChange hook', () => {
        const onChange = jest.fn();

        const component = shallow(
            <PositiveFloat onChange={onChange}
                             value={100}
                             onInvalidInput={jest.fn()}/>);

        const newValue = '1001.89';
        component.find('input').simulate('change', {target: {value: newValue}})
        expect(onChange).toHaveBeenCalledWith(parseFloat(newValue));
      })

      it('should remove leading zero', () => {
        const onChange = jest.fn();

        const component = shallow(
            <PositiveFloat onChange={onChange}
                             value={100}
                             onInvalidInput={jest.fn()}/>);

        const newValue = '0001001.90';
        component.find('input').simulate('change', {target: {value: newValue}})
        expect(onChange).toHaveBeenCalledWith(1001.9);
      })
    })

    describe('when input is invalid', () => {
      it('should update value and limit to precision value', () => {
        const value = 102;
        const component = shallow(<PositiveFloat value={value} precision={2}/>);
        const newValue = 102.332;
        component.find('input').simulate('change', {target: {value: newValue}})
        expect(component.state().value).toBe(value.toString());
      })

      it('should not update value on invalid input', () => {
        const value = 100.12;
        const component = shallow(<PositiveFloat onChange={jest.fn()} value={value}/>);
        component.find('input').simulate('change', {target: {value: '1239k'}})
        expect(component.state().value).toBe(value.toString());
      })

      it('should not update value on invalid input in between', () => {
        const value = 100.43;
        const component = shallow(<PositiveFloat onChange={jest.fn()} value={value}/>);
        component.find('input').simulate('change', {target: {value: '1239k432'}})
        expect(component.state().value).toBe(value.toString());
      })

      it('should not update value on invalid input at start', () => {
        const value = 100.64;
        const component = shallow(<PositiveFloat onChange={jest.fn()} value={value}/>);
        component.find('input').simulate('change', {target: {value: '1239k432'}})
        expect(component.state().value).toBe(value.toString());
      })

      it('should not update value on minus sign at start', () => {
        const value = 100.75;
        const component = shallow(<PositiveFloat onChange={jest.fn()} value={value}/>);
        component.find('input').simulate('change', {target: {value: '-100.75'}})
        expect(component.state().value).toBe(value.toString());
      })

      it('should call onInvalidInput hook', () => {
        const value = 100.98;
        const onInvalidInput = jest.fn();

        const component = shallow(
            <PositiveFloat onChange={jest.fn()}
                             value={value}
                             onInvalidInput={onInvalidInput}/>);

        component.find('input').simulate('change', {target: {value: '-100.98'}})
        expect(onInvalidInput).toHaveBeenCalledWith('-100.98');
      })
    })
  })
})
