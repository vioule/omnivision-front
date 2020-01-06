import React from 'react';
import { shallow } from 'enzyme';

import Error404 from '../components/Error404';

describe('Error404 component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Error404 />);
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('renders the expected component', () => {
    expect(component.find('.error-404').length).toEqual(1);
    expect(component.find('.head').length).toEqual(1);
    expect(component.find('.eyes').length).toEqual(2);
    expect(component.find('.error-number').length).toEqual(1);
    expect(component.find('.error-message').length).toEqual(1);
    expect(component.find('.error-alerts').length).toEqual(1);
  });
});
