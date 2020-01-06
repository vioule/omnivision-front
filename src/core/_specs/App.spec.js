import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../components/App';

describe('App component', () => {
  let component;

  const props = {
    children: <div />,
    getProjectsList: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<App {...props} />);
    jest.clearAllMocks();
  });

  it('renders component', () => {
    expect(component).toBeDefined();
  });

  it('get project list after mounting', () => {
    component.instance().componentDidMount();
    expect(props.getProjectsList).toHaveBeenCalledTimes(1);
  });

  it('renders the expected component', () => {
    expect(component.find('.app-container').length).toEqual(1);
    expect(component.find('Connect(Header)').length).toEqual(1);
    expect(component.find('Container').length).toEqual(1);
    expect(component.find('Footer').length).toEqual(1);
  });
});
