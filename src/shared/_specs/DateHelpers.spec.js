import moment from 'moment';
import DateHelpers from '../DateHelpers';

const dateFormat = 'YYYY-MM-DD';

describe('DateHelpers', () => {
  it('defines statics methods', () => {
    expect(DateHelpers.easterDay).toBeDefined();
    expect(DateHelpers.easterMonday).toBeDefined();
    expect(DateHelpers.ascensionDay).toBeDefined();
    expect(DateHelpers.pentecostDay).toBeDefined();
    expect(DateHelpers.newYearDay).toBeDefined();
    expect(DateHelpers.laborDay).toBeDefined();
    expect(DateHelpers.alliesVictoryDay).toBeDefined();
    expect(DateHelpers.nationalDay).toBeDefined();
    expect(DateHelpers.assumptionDay).toBeDefined();
    expect(DateHelpers.allSaintsDay).toBeDefined();
    expect(DateHelpers.veteransDay).toBeDefined();
    expect(DateHelpers.christmasDay).toBeDefined();
    expect(DateHelpers.getHolidaysList).toBeDefined();
    expect(DateHelpers.isHoliday).toBeDefined();
  });

  it('returns the easter day', () => {
    expect(moment.isMoment(DateHelpers.easterDay())).toEqual(true);
    expect(DateHelpers.easterDay(2018).format(dateFormat)).toEqual('2018-04-01');
    expect(DateHelpers.easterDay(2019).format(dateFormat)).toEqual('2019-04-21');
    expect(DateHelpers.easterDay(2020).format(dateFormat)).toEqual('2020-04-12');
  });

  it('returns the easter monday', () => {
    expect(moment.isMoment(DateHelpers.easterMonday())).toEqual(true);
    expect(DateHelpers.easterMonday(2018).format(dateFormat)).toEqual('2018-04-02');
    expect(DateHelpers.easterMonday(2019).format(dateFormat)).toEqual('2019-04-22');
    expect(DateHelpers.easterMonday(2020).format(dateFormat)).toEqual('2020-04-13');
  });

  it('returns the ascension day', () => {
    expect(moment.isMoment(DateHelpers.ascensionDay())).toEqual(true);
    expect(DateHelpers.ascensionDay(2018).format(dateFormat)).toEqual('2018-05-10');
    expect(DateHelpers.ascensionDay(2019).format(dateFormat)).toEqual('2019-05-30');
    expect(DateHelpers.ascensionDay(2020).format(dateFormat)).toEqual('2020-05-21');
  });

  it('returns the pentecost day', () => {
    expect(moment.isMoment(DateHelpers.pentecostDay())).toEqual(true);
    expect(DateHelpers.pentecostDay(2018).format(dateFormat)).toEqual('2018-05-21');
    expect(DateHelpers.pentecostDay(2019).format(dateFormat)).toEqual('2019-06-10');
    expect(DateHelpers.pentecostDay(2020).format(dateFormat)).toEqual('2020-06-01');
  });

  it('returns the new year day', () => {
    expect(moment.isMoment(DateHelpers.newYearDay())).toEqual(true);
    expect(DateHelpers.newYearDay(2018).format(dateFormat)).toEqual('2018-01-01');
    expect(DateHelpers.newYearDay(2019).format(dateFormat)).toEqual('2019-01-01');
    expect(DateHelpers.newYearDay(2020).format(dateFormat)).toEqual('2020-01-01');
  });

  it('returns the labor day', () => {
    expect(moment.isMoment(DateHelpers.laborDay())).toEqual(true);
    expect(DateHelpers.laborDay(2018).format(dateFormat)).toEqual('2018-05-01');
    expect(DateHelpers.laborDay(2019).format(dateFormat)).toEqual('2019-05-01');
    expect(DateHelpers.laborDay(2020).format(dateFormat)).toEqual('2020-05-01');
  });

  it('returns the allies victory day', () => {
    expect(moment.isMoment(DateHelpers.alliesVictoryDay())).toEqual(true);
    expect(DateHelpers.alliesVictoryDay(2018).format(dateFormat)).toEqual('2018-05-08');
    expect(DateHelpers.alliesVictoryDay(2019).format(dateFormat)).toEqual('2019-05-08');
    expect(DateHelpers.alliesVictoryDay(2020).format(dateFormat)).toEqual('2020-05-08');
  });

  it('returns the national day', () => {
    expect(moment.isMoment(DateHelpers.nationalDay())).toEqual(true);
    expect(DateHelpers.nationalDay(2018).format(dateFormat)).toEqual('2018-07-14');
    expect(DateHelpers.nationalDay(2019).format(dateFormat)).toEqual('2019-07-14');
    expect(DateHelpers.nationalDay(2020).format(dateFormat)).toEqual('2020-07-14');
  });

  it('returns the assumption day', () => {
    expect(moment.isMoment(DateHelpers.assumptionDay())).toEqual(true);
    expect(DateHelpers.assumptionDay(2018).format(dateFormat)).toEqual('2018-08-15');
    expect(DateHelpers.assumptionDay(2019).format(dateFormat)).toEqual('2019-08-15');
    expect(DateHelpers.assumptionDay(2020).format(dateFormat)).toEqual('2020-08-15');
  });

  it('returns the all saints day', () => {
    expect(moment.isMoment(DateHelpers.allSaintsDay())).toEqual(true);
    expect(DateHelpers.allSaintsDay(2018).format(dateFormat)).toEqual('2018-11-01');
    expect(DateHelpers.allSaintsDay(2019).format(dateFormat)).toEqual('2019-11-01');
    expect(DateHelpers.allSaintsDay(2020).format(dateFormat)).toEqual('2020-11-01');
  });

  it('returns the veterans day', () => {
    expect(moment.isMoment(DateHelpers.veteransDay())).toEqual(true);
    expect(DateHelpers.veteransDay(2018).format(dateFormat)).toEqual('2018-11-11');
    expect(DateHelpers.veteransDay(2019).format(dateFormat)).toEqual('2019-11-11');
    expect(DateHelpers.veteransDay(2020).format(dateFormat)).toEqual('2020-11-11');
  });

  it('returns the christmas day', () => {
    expect(moment.isMoment(DateHelpers.christmasDay())).toEqual(true);
    expect(DateHelpers.christmasDay(2018).format(dateFormat)).toEqual('2018-12-25');
    expect(DateHelpers.christmasDay(2019).format(dateFormat)).toEqual('2019-12-25');
    expect(DateHelpers.christmasDay(2020).format(dateFormat)).toEqual('2020-12-25');
  });

  it('returns the christmas day', () => {
    expect(typeof DateHelpers.getHolidaysList()).toEqual('object');
    expect(Object.keys(DateHelpers.getHolidaysList()).length).toEqual(12);
    expect(Object.keys(DateHelpers.getHolidaysList(2018)).length).toEqual(12);
    expect(DateHelpers.getHolidaysList(2018)).toEqual({
      "Armistice": "2018-11-11",
      "Ascension": "2018-05-10",
      "Assomption": "2018-08-15",
      "Fête Nationale": "2018-07-14",
      "Fête du travail": "2018-05-01",
      "Jour de l’an": "2018-01-01",
      "Lundi de Pâques": "2018-04-02",
      "Noël": "2018-12-25",
      "Pentecôte": "2018-05-21",
      "Pâques": "2018-04-01",
      "Toussaint": "2018-11-01",
      "Victoire des alliés": "2018-05-08",
    });
  });

  it('returns if the date is in holiday', () => {
    expect(DateHelpers.isHoliday('2018-11-11')).toEqual(true);
    expect(DateHelpers.isHoliday("2018-05-10")).toEqual(true);
    expect(DateHelpers.isHoliday("2018-08-15")).toEqual(true);
    expect(DateHelpers.isHoliday("2018-07-14")).toEqual(true);
    expect(DateHelpers.isHoliday("2018-05-01")).toEqual(true);
    expect(DateHelpers.isHoliday("2018-01-01")).toEqual(true);
    expect(DateHelpers.isHoliday("2018-04-02")).toEqual(true);
    expect(DateHelpers.isHoliday("2018-12-25")).toEqual(true);
    expect(DateHelpers.isHoliday("2018-05-21")).toEqual(true);
    expect(DateHelpers.isHoliday("2018-04-01")).toEqual(true);
    expect(DateHelpers.isHoliday("2018-11-01")).toEqual(true);
    expect(DateHelpers.isHoliday("2018-05-08")).toEqual(true);
    expect(DateHelpers.isHoliday(moment('2018-11-12'))).toEqual(false);
    expect(DateHelpers.isHoliday('2018-11-12')).toEqual(false);
    expect(DateHelpers.isHoliday("2018-05-09")).toEqual(false);
    expect(DateHelpers.isHoliday("2018-05-11")).toEqual(false);
  });
});
