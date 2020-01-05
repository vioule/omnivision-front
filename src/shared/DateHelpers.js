// @flow
import moment from 'moment';

import type { DictionaryObject } from '../core/models';
import * as translationsHelpers from '../translations/helpers';

const { translate } = translationsHelpers;
const dateFormat = 'YYYY-mm-dd';

class DateHelpers {
  static easterDay(year?: number): moment {
    const Y = year || moment().year();
    const n = Y % 19;
    const c = Math.floor(Y / 100);
    const u = Y % 100;
    const s = Math.floor(c / 4);
    const t = c % 4;
    const p = Math.floor((c + 8) / 25);
    const q = Math.floor((c - p + 1) / 3);
    const e = ((19 * n) + c - s - q + 15) % 30;
    const b = Math.floor(u / 4);
    const d = u % 4;
    const L = ((2 * t) + (2 * b) - e - d + 32) % 7;
    const h = Math.floor((n + (11 * e) + (22 * L)) / 451);
    const m = Math.floor((e + L - (7 * h) + 114) / 31);
    const j = ((e + L - (7 * h) + 114) % 31) + 1;
    const date = `${Y}-${m < 10 ? `0${m}` : m}-${j < 10 ? `0${j}` : j}`;
    return moment(date);
  }

  static easterMonday(year?: number): moment {
    const Y = year || moment().year();
    return DateHelpers.easterDay(Y).add(1, 'days');
  }

  static ascensionDay(year?: number): moment {
    const Y = year || moment().year();
    return DateHelpers.easterDay(Y).add(39, 'days');
  }

  static pentecostDay(year?: number): moment {
    const Y = year || moment().year();
    return DateHelpers.easterDay(Y).add(50, 'days');
  }

  static newYearDay(year?: number): moment {
    const Y = year || moment().year();
    return moment(`${Y}-01-01`, dateFormat);
  }

  static laborDay(year?: number): moment {
    const Y = year || moment().year();
    return moment(`${Y}-05-01`, dateFormat);
  }

  static alliesVictoryDay(year?: number): moment {
    const Y = year || moment().year();
    return moment(`${Y}-05-08`, dateFormat);
  }

  static nationalDay(year?: number): moment {
    const Y = year || moment().year();
    return moment(`${Y}-07-14`, dateFormat);
  }

  static assumptionDay(year?: number): moment {
    const Y = year || moment().year();
    return moment(`${Y}-08-15`, dateFormat);
  }

  static allSaintsDay(year?: number): moment {
    const Y = year || moment().year();
    return moment(`${Y}-11-01`, dateFormat);
  }

  static veteransDay(year?: number): moment {
    const Y = year || moment().year();
    return moment(`${Y}-11-11`, dateFormat);
  }

  static christmasDay(year?: number): moment {
    const Y = year || moment().year();
    return moment(`${Y}-12-25`, dateFormat);
  }

  static getHolidaysList(year?: number): DictionaryObject {
    const Y = year || moment().year();
    return {
      [translate('holiday.all.saints.day')]: DateHelpers.allSaintsDay(Y).format(),
      [translate('holiday.allies.victory.day')]: DateHelpers.alliesVictoryDay(Y).format(),
      [translate('holiday.ascension.day')]: DateHelpers.ascensionDay(Y).format(),
      [translate('holiday.assumption.day')]: DateHelpers.assumptionDay(Y).format(),
      [translate('holiday.christmas.day')]: DateHelpers.christmasDay(Y).format(),
      [translate('holiday.easter.day')]: DateHelpers.easterDay(Y).format(),
      [translate('holiday.easter.monday')]: DateHelpers.easterMonday(Y).format(),
      [translate('holiday.labor.day')]: DateHelpers.laborDay(Y).format(),
      [translate('holiday.national.day')]: DateHelpers.nationalDay(Y).format(),
      [translate('holiday.new.year.day')]: DateHelpers.newYearDay(Y).format(),
      [translate('holiday.pentecost.day')]: DateHelpers.pentecostDay(Y).format(),
      [translate('holiday.veterans.day')]: DateHelpers.veteransDay(Y).format(),
    };
  }

  static isHoliday(date?: moment): boolean {
    const day = !!date ? moment(date) : moment();
    const holidays = DateHelpers.getHolidaysList(day.year());
    return Object.keys(holidays).some((key) => day.isSame(holidays[key], 'day'));
  }
}

export default DateHelpers;
