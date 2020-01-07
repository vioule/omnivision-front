// @flow
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavItem from 'react-bootstrap/NavItem';
import NavDropdown from 'react-bootstrap/NavDropdown';

import type { NavLinks } from '../models';
import * as coreConstants from '../../core/constants';
import * as translationsHelpers from '../../translations/helpers';

import '../styles/Header.scss';

type Props = {
  projects: NavLinks,
  onClick: () => void,
};

const { translate } = translationsHelpers;
const { PATHS } = coreConstants;

const HeaderItems = (props: Props) => {
  const { projects, onClick } = props;
  return (
    <Fragment>
      <NavItem>
        <Link className="nav-link" to={PATHS.DEFAULT} onClick={onClick}>
          {translate('header.home')}
        </Link>
      </NavItem>

      <NavDropdown as={NavItem} title={translate('header.projects')} id="nav-projects">
        {projects.map((link, index) => (
          <Link className="dropdown-item" key={index} to={link.link} onClick={onClick}>
            {link.label}
          </Link>
        ))}
      </NavDropdown>

      <NavItem>
        <Link className="nav-link" to={PATHS.CALENDAR} onClick={onClick}>
          {translate('header.calendar')}
        </Link>
      </NavItem>
    </Fragment>
  );
};

export default HeaderItems;
