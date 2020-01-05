// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import { Link } from 'react-router-dom';

import type { NavLinks } from '../models';
import * as coreConstants from '../../core/constants';
import * as projectsSelectors from '../../project/selectors';
import HeaderItems from './HeaderItems';
import IconVision from '../../shared/Icons/IconVision';
import IconBurgerMenu from '../../shared/Icons/IconBurgerMenu';

import '../styles/Header.scss';

type Props = {
  navProjects: NavLinks,
};

type State = {
  isExpanded: boolean,
};

class Header extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggleNavBar = () => {
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
  }

  closeNavBar = () => {
    const { isExpanded } = this.state;
    if (isExpanded) {
      this.toggleNavBar();
    }
  }

  render() {
    const { navProjects } = this.props;
    const { isExpanded } = this.state;

    return (
      <Navbar expanded={isExpanded} onToggle={this.toggleNavBar} expand="md" className="header" variant="">
        <Link rel="nofollow" to={coreConstants.PATHS.DEFAULT} onClick={this.closeNavBar}>
          <div className="header-name">
            <IconVision className="header-icon" />
            OmniVision
          </div>
        </Link>
        <NavbarToggle onClick={this.toggleNavBar} aria-controls="nav-bar">
          <IconBurgerMenu className="nav-bar-icon" />
        </NavbarToggle>
        <NavbarCollapse id="nav-bar">
          <Nav>
            <HeaderItems onClick={this.closeNavBar} projects={navProjects} />
          </Nav>
        </NavbarCollapse>
      </Navbar>
    );
  }
}

const mapState = (state: Object) => ({
  navProjects: projectsSelectors.projectsNavBarSelector(state),
});

export default connect(mapState)(Header);
