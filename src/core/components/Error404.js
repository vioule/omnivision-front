// @flow
import React from 'react';

import * as translationsHelpers from '../../translations/helpers';

import '../styles/error404.scss';

const { translate } = translationsHelpers;

const Error404 = () => (
  <div className="error-404">
    <div className="head">
      <span className="eyes" />
      <span className="eyes" />
    </div>
    <span className="error-number">404</span>
    <span className="error-message">{translate('error.404.lost.title')}</span>
    <span className="error-alerts" />
  </div>
);

export default Error404;
