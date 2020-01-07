// @flow
import type { Dispatch as DispatchRedux } from 'redux';

export type Dispatch = DispatchRedux;

export type DictionaryObject = {
  [key: string]: string,
};

export type RouterLocation = {
  hash: string,
  pathname: string,
  query: DictionaryObject,
  search: string,
  state: DictionaryObject,
};
