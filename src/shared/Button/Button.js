// @flow
import React, { type Node, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Spinner from '../Spinner';
import UrlHelpers from '../UrlHelpers';

import './Button.scss';

type Props = {
  children: Node,
  className?: string,
  disabled?: boolean,
  isLoading?: boolean,
  href?: string,
  style?: string,
  onClick: (event: Event) => void,
};

const styles = [
  'primary',
  'primary-negative',
  'secondary',
  'secondary-negative',
  'tertiary',
  'tertiary-negative',
  'quaternary',
  'quaternary-negative',
];

const Button = (props: Props) => {
  const { children, className: propsClassName, disabled, isLoading, href, style } = props;

  const actionOnClick = (event: Event) => {
    if (!disabled && props.onClick) props.onClick(event);
  };

  const btnStyle = style && styles.includes(style) ? style : 'none';
  const className = classnames({
    button: true,
    [`button-${btnStyle}`]: btnStyle !== 'none',
    'button-disabled': disabled || isLoading,
    'button-loading': !!isLoading,
  });
  const disabledButton = disabled || isLoading;

  const localUrl = UrlHelpers.isLocalUrl(href);
  const buttonProps = {
    onClick: actionOnClick,
    className: 'button-inner',
  };

  return (
    <div className={`${className} ${!!propsClassName ? propsClassName : ''}`}>
      {disabledButton && (
        <Fragment>
          {isLoading && <Spinner />}
          <span className="button-inner">{children}</span>
        </Fragment>
      )}
      {!disabledButton && (
        <Fragment>
          {!href && (
            <div {...buttonProps}>
              {children}
            </div>
          )}
          {href && localUrl && (
            <Link to={href} {...buttonProps}>
              {children}
            </Link>
          )}
          {href && !localUrl && (
            <a href={href} target="_blank" rel="noopener noreferrer" {...buttonProps}>
              {children}
            </a>
          )}
        </Fragment>
      )}
    </div>
  );
};

Button.defaultProps = {
  className: '',
  disabled: false,
  isLoading: false,
  href: null,
  style: 'primary',
};

export default Button;
