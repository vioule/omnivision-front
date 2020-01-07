import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../components/Header';

describe('Header component', () => {
  let component;

  const props = {
    navProjects: [
      { label: 'test1', link: '/test1' },
      { label: 'test2', link: '/test2' },
      { label: 'test3', link: '/test3' },
      { label: 'test4', link: '/test4' },
    ],
  };

  beforeEach(() => {
    component = shallow(<Header {...props} />);
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('has his own state', () => {
    expect(component.state()).toEqual({
      isExpanded: false,
    });
  });

  it('defines methods', () => {
    expect(component.instance().toggleNavBar).toBeDefined();
    expect(component.instance().closeNavBar).toBeDefined();
    expect(component.instance().render).toBeDefined();
  });

  it('allows to toggle the nav bar visibility', () => {
    expect(component.state('isExpanded')).toEqual(false);
    component.instance().toggleNavBar();
    expect(component.state('isExpanded')).toEqual(true);
    component.instance().toggleNavBar();
    expect(component.state('isExpanded')).toEqual(false);
  });

  it('allows to close the nav bar', () => {
    expect(component.state('isExpanded')).toEqual(false);
    component.instance().closeNavBar();
    expect(component.state('isExpanded')).toEqual(false);
    component.instance().toggleNavBar();
    expect(component.state('isExpanded')).toEqual(true);
    component.instance().closeNavBar();
    expect(component.state('isExpanded')).toEqual(false);
  });

  it('renders the component', () => {
    expect(component.find('Navbar').length).toEqual(1);
    expect(component.find('.header').length).toEqual(1);
    expect(component.find('Link').length).toEqual(1);
    expect(component.find('.header-name').length).toEqual(1);
    expect(component.find('IconVision').length).toEqual(1);
    expect(component.find('.header-icon').length).toEqual(1);
    expect(component.find('NavbarToggle').length).toEqual(1);
    expect(component.find('IconBurgerMenu').length).toEqual(1);
    expect(component.find('.nav-bar-icon').length).toEqual(1);
    expect(component.find('NavbarCollapse').length).toEqual(1);
    expect(component.find('#nav-bar').length).toEqual(1);
    expect(component.find('Nav').length).toEqual(1);
    expect(component.find('HeaderItems').length).toEqual(1);
  });
});
