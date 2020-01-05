// @flow

import type { DictionaryObject } from '../core/models';

class UrlHelpers {
  static getOrigin(): string {
    return window.location.origin;
  }

  static isLocalUrl(url: ?string): boolean {
    if (!url) return false;
    const host = UrlHelpers.getOrigin();
    return !!url && (url.startsWith(host) || !url.startsWith('http'));
  }

  static parseQueryStringParameters(path: string): DictionaryObject {
    const query = path.split('?')[1];
    if (!query) return {};
    return query
      .split('&')
      .reduce((params, current) => {
        const [key, value] = current.split('=');
        return {
          ...params,
          [key]: value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '',
        };
      }, {});
  }

  static stringifyParametersAsQuery(params: DictionaryObject): string {
    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
}

export default UrlHelpers;
