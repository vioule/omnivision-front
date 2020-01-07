import moment from 'moment';
import StringHelpers from '../StringHelpers';

const dateFormat = 'YYYY-MM-DD';

describe('StringHelpers', () => {
  it('defines statics methods', () => {
    expect(StringHelpers.isString).toBeDefined();
    expect(StringHelpers.isEmpty).toBeDefined();
    expect(StringHelpers.camelCase).toBeDefined();
  });

  it('returns if value is a string', () => {
    expect(StringHelpers.isString('test')).toEqual(true);
    expect(StringHelpers.isString(2018)).toEqual(false);
    expect(StringHelpers.isString([])).toEqual(false);
    expect(StringHelpers.isString({})).toEqual(false);
  });

  it('returns if the value is an empty string', () => {
    expect(StringHelpers.isEmpty('test')).toEqual(false);
    expect(StringHelpers.isEmpty('')).toEqual(true);
    expect(StringHelpers.isEmpty('    ')).toEqual(true);
    expect(StringHelpers.isEmpty(2018)).toEqual(true);
    expect(StringHelpers.isEmpty([])).toEqual(true);
    expect(StringHelpers.isEmpty({})).toEqual(true);
  });

  it('returns the value in camelcase format', () => {
    expect(StringHelpers.camelCase('test')).toEqual('test');
    expect(StringHelpers.camelCase(2018)).toEqual(2018);
    expect(StringHelpers.camelCase([])).toEqual([]);
    expect(StringHelpers.camelCase({})).toEqual({});
    expect(StringHelpers.camelCase('test app')).toEqual('testApp');
    expect(StringHelpers.camelCase('TEST APP')).toEqual('testApp');
    expect(StringHelpers.camelCase('test-app')).toEqual('testApp');
    expect(StringHelpers.camelCase('test+app')).toEqual('testApp');
    expect(StringHelpers.camelCase('test_app')).toEqual('testApp');
  });
});
