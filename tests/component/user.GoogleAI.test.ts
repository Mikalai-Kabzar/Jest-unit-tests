import { User, Status } from './User';

describe('User', () => {
  let user: User;
  const child1 = new User('123', 'John', 'Doe', 10, 100, [], 'Anytown', 'CA', 'USA', Status.Regular);
  const child2 = new User('456', 'Jane', 'Smith', 15, 200, [], 'Anycity', 'TX', 'USA', Status.Regular);
  const child3 = new User('789', 'Bob', 'Johnson', 5, 50, [], 'Anystate', 'FL', 'USA', Status.Regular);
  
  beforeEach(() => {
    user = new User('1', 'Alice', 'Smith', 30, 5000, [child1, child2, child3], 'Anycity', 'TX', 'USA', Status.Regular);
  });

  test('getTotalMoney should calculate the total money of the user and their children', () => {
    expect(user.getTotalMoney()).toBe(5350);
  });

  test('isEligibleForDiscount should return true when the user status is VIP or Admin', () => {
    user.status = Status.VIP;
    expect(user.isEligibleForDiscount()).toBe(true);

    user.status = Status.Admin;
    expect(user.isEligibleForDiscount()).toBe(true);
  });

  test('isEligibleForDiscount should return false when the user status is not VIP or Admin', () => {
    user.status = Status.Regular;
    expect(user.isEligibleForDiscount()).toBe(false);

    user.status = Status.Outdated;
    expect(user.isEligibleForDiscount()).toBe(false);
  });

  test('incrementAgeUntil should increase the age of the user until it reaches the target age', () => {
    user.incrementAgeUntil(40);
    expect(user.age).toBe(40);
  });

  test('categorizeUserByAge should return correct category based on user age', () => {
    user.age = 10;
    expect(user.categorizeUserByAge()).toBe('Child');

    user.age = 30;
    expect(user.categorizeUserByAge()).toBe('Adult');

    user.age = 70;
    expect(user.categorizeUserByAge()).toBe('Senior');
  });

  test('isTeenager should return true when the user age is between 13 and 19 (inclusive)', () => {
    user.age = 15;
    expect(user.isTeenager()).toBe(true);

    user.age = 20;
    expect(user.isTeenager()).toBe(false);
  });

  test('isSeniorCitizen should return true when the user age is 65 or above', () => {
    user.age = 65;
    expect(user.isSeniorCitizen()).toBe(true);

    user.age = 60;
    expect(user.isSeniorCitizen()).toBe(false);
  });

  test('calculateRetirementAge should return the retirement age', () => {
    expect(user.calculateRetirementAge()).toBe(65);
  });

  test('calculateYearsToRetired should return the correct number of years until retirement', () => {
    user.age = 50;
    expect(user.calculateYearsToRetired()).toBe(15);

    user.age = 70;
    expect(user.calculateYearsToRetired()).toBe(0);
  });

  test('proposeNewStatus should return the correct status based on user money', () => {
    user.money = 500;
    expect(user.proposeNewStatus()).toBe(Status.Outdated);

    user.money = 2500;
    expect(user.proposeNewStatus()).toBe(Status.Regular);

    user.money = 7500;
    expect(user.proposeNewStatus()).toBe(Status.VIP);

    user.money = 15000;
    expect(user.proposeNewStatus()).toBe(Status.Admin);
  });
});