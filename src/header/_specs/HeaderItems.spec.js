import React from 'react';
import { shallow } from 'enzyme';

import HeaderItems from '../components/HeaderItems';

describe('HeaderItems component', () => {
  let component;

  const props = {
    projects: [
      { label: 'test1', link: '/test1' },
      { label: 'test2', link: '/test2' },
      { label: 'test3', link: '/test3' },
      { label: 'test4', link: '/test4' },
    ],
    onClick: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<HeaderItems {...props} />);
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('renders the component', () => {
    expect(component.find('Fragment').length).toEqual(1);
    expect(component.find('NavDropdown').length).toEqual(1);
    expect(component.find('#nav-projects').length).toEqual(1);
    expect(component.find('NavItem').length).toEqual(2);
    expect(component.find('Link').length).toEqual(6);
    expect(component.find('.nav-link').length).toEqual(2);
    expect(component.find('.dropdown-item').length).toEqual(4);
  });
});
