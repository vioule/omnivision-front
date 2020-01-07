import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';

describe('Button component', () => {
  let component;

  const props = {
    children: <div />,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<Button {...props} />);
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('has default props', () => {
    const { defaultProps } = Button;
    expect(defaultProps.className).toBeDefined();
    expect(defaultProps.className).toEqual('');
    expect(defaultProps.disabled).toBeDefined();
    expect(defaultProps.disabled).toEqual(false);
    expect(defaultProps.isLoading).toBeDefined();
    expect(defaultProps.isLoading).toEqual(false);
    expect(defaultProps.href).toBeDefined();
    expect(defaultProps.href).toEqual(null);
    expect(defaultProps.style).toBeDefined();
    expect(defaultProps.style).toEqual('primary');
  });

  it('renders a button without href', () => {
    const localProps = {
      ...props,
      href: null,
    };
    component = shallow(<Button {...localProps} />);
    expect(component.find('.button').length).toEqual(1);
    expect(component.find('.button-primary').length).toEqual(1);
    expect(component.find('.button-inner').length).toEqual(1);
  });

  it('renders a button with local href', () => {
    const localProps = {
      ...props,
      href: 'somewhere',
    };
    component = shallow(<Button {...localProps} />);
    expect(component.find('.button').length).toEqual(1);
    expect(component.find('.button-primary').length).toEqual(1);
    expect(component.find('.button-inner').length).toEqual(1);
    expect(component.find('Link').length).toEqual(1);
  });

  it('renders a button with an external href', () => {
    const localProps = {
      ...props,
      href: 'http://somewhere.com',
    };
    component = shallow(<Button {...localProps} />);
    expect(component.find('.button').length).toEqual(1);
    expect(component.find('.button-primary').length).toEqual(1);
    expect(component.find('.button-inner').length).toEqual(1);
    expect(component.find('a').length).toEqual(1);
    expect(component.find('a[target="_blank"]').length).toEqual(1);
    expect(component.find('a[rel="noopener noreferrer"]').length).toEqual(1);
  });

  it('renders a button while loading', () => {
    const localProps = {
      ...props,
      isLoading: true,
    };
    component = shallow(<Button {...localProps} />);
    expect(component.find('.button').length).toEqual(1);
    expect(component.find('.button-primary').length).toEqual(1);
    expect(component.find('.button-loading').length).toEqual(1);
    expect(component.find('span.button-inner').length).toEqual(1);
    expect(component.find('Spinner').length).toEqual(1);
  });

  it('renders a button while disabled', () => {
    const localProps = {
      ...props,
      disabled: true,
    };
    component = shallow(<Button {...localProps} />);
    expect(component.find('.button').length).toEqual(1);
    expect(component.find('.button-primary').length).toEqual(1);
    expect(component.find('.button-disabled').length).toEqual(1);
    expect(component.find('span.button-inner').length).toEqual(1);
    expect(component.find('Spinner').length).toEqual(0);
  });
});
