import calculateAge from '../helperFunctions';

const constantDate = new Date('2019-02-22T20:50:00');

// eslint-disable-next-line no-global-assign
Date = class extends Date {
  constructor(date) {
    if (date) {
      // eslint-disable-next-line constructor-super
      return super(date);
    }
    return constantDate;
  }
};

describe('Calculate age', () => {
  it('should return 20 if player was born before this month', () => {
    const birthDate = '1999-01-30';
    const expectedAge = 20;
    expect(calculateAge(birthDate)).toBe(expectedAge);
  });

  it('should return 20 if player was born before this day in the same month', () => {
    const birthDate = '1999-02-10';
    const expectedAge = 20;
    expect(calculateAge(birthDate)).toBe(expectedAge);
  });

  it('should return 19 if player was born after this day', () => {
    const birthDate = '1999-03-30';
    const expectedAge = 19;
    expect(calculateAge(birthDate)).toBe(expectedAge);
  });
});
