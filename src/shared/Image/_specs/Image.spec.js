import React from 'react';
import { shallow } from 'enzyme';

import Image from '../Image';

describe('Image component', () => {
  let component;

  const props = {
    alt: 'test-image-alt',
    src: 'test-image-src',
  };

  beforeEach(() => {
    component = shallow(<Image {...props} />);
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('has default props', () => {
    const { defaultProps } = Image;
    expect(defaultProps.className).toBeDefined();
    expect(defaultProps.className).toEqual('');
    expect(defaultProps.defaultImg).toBeDefined();
    expect(defaultProps.defaultImg).toEqual(null);
    expect(defaultProps.onClick).toBeDefined();
    expect(defaultProps.title).toBeDefined();
    expect(defaultProps.title).toEqual(null);
  });

  it('renders nothing if no src', () => {
    const localProps = {
      ...props,
      src: null,
    };
    component = shallow(<Image {...localProps} />);
    expect(component.html()).toEqual(null);
  });
});
