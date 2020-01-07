import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../components/HomePage';

describe('HomePage component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<HomePage />);
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('renders the expected component', () => {
    expect(component.find('.home-page').length).toEqual(1);
  });
});
