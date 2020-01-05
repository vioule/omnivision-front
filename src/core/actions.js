// @flow
import { push, replace } from 'react-router-redux';

export const changeLocation = (pathname: string, state?: Object) => (
  !!state
    ? push({ pathname, state })
    : push(pathname)
);

export const replaceLocation = (pathname: string, state?: Object) => (
  !!state
    ? replace({ pathname, state })
    : replace(pathname)
);
