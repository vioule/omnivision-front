import moment from 'moment';
import * as translationsHelpers from '../helpers';

const dateFormat = 'YYYY-MM-DD';

describe('Translations Helpers', () => {
  it('defines methods', () => {
    expect(translationsHelpers.getLocale).toBeDefined();
    expect(translationsHelpers.setLocale).toBeDefined();
    expect(translationsHelpers.translate).toBeDefined();
  });

  it('returns the getter for the current locale', () => {
    expect(translationsHelpers.getLocale()).toEqual('fr');
  });

  it('returns the setter for the current locale', () => {
    expect(translationsHelpers.getLocale()).toEqual('fr');
    translationsHelpers.setLocale('en');
    expect(translationsHelpers.getLocale()).toEqual('en');
  });

  it('returns the translation of a string', () => {
    translationsHelpers.setLocale('en');
    expect(translationsHelpers.translate('date.month.January')).toEqual('January');
    translationsHelpers.setLocale('fr');
    expect(translationsHelpers.translate('date.month.January')).toEqual('Janvier');
    expect(translationsHelpers.translate('header.home')).toEqual('Accueil');
    expect(translationsHelpers.translate('years')).toEqual('years');
    expect(translationsHelpers.translate('')).toEqual('');
    expect(translationsHelpers.translate()).toEqual('default');
    expect(translationsHelpers.translate(null)).toEqual(null);
    expect(translationsHelpers.translate(undefined)).toEqual('default');
  });
});
