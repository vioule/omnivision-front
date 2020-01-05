// @flow

class StringHelpers {
  static isString(value: mixed): boolean {
    return typeof value === 'string';
  }

  static isEmpty(value: mixed): boolean {
    return !(typeof value === 'string' && value.trim().length > 0);
  }

  static camelCase(value: string): string {
    if (typeof value === 'string') {
      const string = value
        .toLowerCase()
        .replace(/[.\-_\s]/g, ' ')
        .replace(/\W+(.)/g, (match, p1) => p1.toUpperCase())
        .trim();
      return string.charAt(0).toLowerCase() + string.slice(1);
    }
    return value;
  }
}

export default StringHelpers;
