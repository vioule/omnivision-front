// @flow
import React from 'react';
import ImageBase from 'react-bootstrap/Image';

type Props = {
  alt: string,
  className?: string,
  defaultImg?: ?string,
  src: string,
  title?: ?string,
  onClick?: () => void,
};

const Image = (props: Props) => {
  const { alt, className, defaultImg, onClick, src, title } = props;

  return (
    <ImageBase
      alt={alt}
      className={className}
      onClick={onClick}
      src={src}
      style={{ ...(defaultImg ? { backgroundImage: `url(${defaultImg})` } : {}) }}
      title={title}
    />
  );
};

Image.defaultProps = {
  className: '',
  defaultImg: null,
  onClick: () => {},
  title: null,
};

export default Image;
