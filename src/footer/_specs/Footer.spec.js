import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../components/Footer';

describe('Footer component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Footer />);
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('renders the expected component', () => {
    expect(component.find('.footer').length).toEqual(1);
    expect(component.find('span').length).toEqual(1);
    expect(component.find('span').text()).toEqual('© Omnilog');
  });
});
