// @flow
import React from 'react';

import './Spinner.scss';

type Props = {
  className?: string,
  style?: string,
};

const styles = [
  'primary',
];

export const Spinner = (props: Props) => {
  const defaultStyle = styles[0];
  const {
    className: propsClassName,
    style = defaultStyle,
  } = props;
  const spinnerStyle = styles.includes(style) ? style : defaultStyle;
  const className = `spinner spinner-${spinnerStyle || ''} ${propsClassName || ''}`;

  return (
    <div className={className}>
      <span className="spinner-icon" />
    </div>
  );
};

Spinner.defaultProps = {
  className: null,
  style: 'primary',
};

export default Spinner;
