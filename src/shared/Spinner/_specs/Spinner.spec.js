import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '../Spinner';

describe('Spinner component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Spinner />);
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('has default props', () => {
    const { defaultProps } = Spinner;
    expect(defaultProps.className).toBeDefined();
    expect(defaultProps.className).toEqual(null);
    expect(defaultProps.style).toBeDefined();
    expect(defaultProps.style).toEqual('primary');
  });

  it('renders the expected component', () => {
    expect(component.find('.spinner').length).toEqual(1);
    expect(component.find('.spinner-primary').length).toEqual(1);
    expect(component.find('.spinner-icon').length).toEqual(1);
  });

  it('renders the component with props', () => {
    const localProps = {
      className: 'test-className',
      style: 'test',
    };
    component = shallow(<Spinner {...localProps} />);
    expect(component.find('.spinner').length).toEqual(1);
    expect(component.find('.spinner-primary').length).toEqual(1);
    expect(component.find('.spinner-test').length).toEqual(0);
    expect(component.find('.test-className').length).toEqual(1);
    expect(component.find('.spinner-icon').length).toEqual(1);
  });
});
