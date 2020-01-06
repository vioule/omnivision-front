import moment from 'moment';
import UrlHelpers from '../UrlHelpers';

const dateFormat = 'YYYY-MM-DD';

describe('UrlHelpers', () => {
  it('defines statics methods', () => {
    expect(UrlHelpers.getOrigin).toBeDefined();
    expect(UrlHelpers.isLocalUrl).toBeDefined();
    expect(UrlHelpers.parseQueryStringParameters).toBeDefined();
    expect(UrlHelpers.stringifyParametersAsQuery).toBeDefined();
  });

  it('returns the origin location', () => {
    expect(UrlHelpers.getOrigin()).toEqual('http://localhost');
  });

  it('returns if the url is a local url', () => {
    expect(UrlHelpers.isLocalUrl()).toEqual(false);
    expect(UrlHelpers.isLocalUrl('http://somewhere.com')).toEqual(false);
    expect(UrlHelpers.isLocalUrl('https://somewhere.com')).toEqual(false);
    expect(UrlHelpers.isLocalUrl('/test')).toEqual(true);
  });

  it('returns query params', () => {
    const id = '3';
    const name = 'test';
    const url = `http://localhost/?id=${id}&name=${name}`;
    const expectedResult = { id, name };
    expect(UrlHelpers.parseQueryStringParameters(url)).toEqual(expectedResult);
    expect(UrlHelpers.parseQueryStringParameters(UrlHelpers.getOrigin())).toEqual({});
  });

  it('returns query params as url', () => {
    const id = '3';
    const name = 'test';
    const params = { id, name };
    const expectedResult = `id=${id}&name=${name}`;
    expect(UrlHelpers.stringifyParametersAsQuery(params)).toEqual(expectedResult);
  });
});
