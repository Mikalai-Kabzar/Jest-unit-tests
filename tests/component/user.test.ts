// User.test.ts
import { User, Status } from './User';

describe('User class', () => {
  it('should create a new user with the provided values', () => {
    const user = new User(
      '1', // Mocked ID for testing
      'John',
      'Doe',
      25,
      1000,
      [],
      'Fluffy',
      '123 Main St',
      'ABC123',
      Status.Regular
    );

    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.age).toBe(25);
    expect(user.money).toBe(1000);
    expect(user.children).toEqual([]);
    expect(user.petName).toBe('Fluffy');
    expect(user.address).toBe('123 Main St');
    expect(user.postCode).toBe('ABC123');
    expect(user.status).toBe(Status.Regular);
  });

  it('should default children to an empty array if not provided', () => {
    const user = new User(
      '1', 
      'Jane',
      'Doe',
      30,
      1500,
      undefined,
      'Buddy',
      '456 Oak St',
      'XYZ789',
      Status.VIP
    );

    expect(user.children).toEqual([]);
  });
  
  it('should add a child to the user', () => {
    const parent = new User('1', 'Parent', 'User', 35, 2000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const child = new User('2', 'Child', 'User', 10, 0, [], 'Sparky', '987 Birch St', 'GHI789', Status.Outdated);

    parent.children.push(child);

    expect(parent.children).toContain(child);
  });

  it('should edit a child\'s information', () => {
    const parent = new User('1', 'Parent', 'User', 35, 2000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const child = new User('2', 'Child', 'User', 10, 0, [], 'Sparky', '987 Birch St', 'GHI789', Status.Outdated);

    parent.children.push(child);

    // Edit child's information
    child.age = 12;
    child.address = '123 Pine St';

    expect(child.age).toBe(12);
    expect(child.address).toBe('123 Pine St');
  });

  it('should remove a child from the user', () => {
    const parent = new User('1', 'Parent', 'User', 35, 2000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const child = new User('2', 'Child', 'User', 10, 0, [], 'Sparky', '987 Birch St', 'GHI789', Status.Outdated);

    parent.children.push(child);

    // Remove child
    const indexToRemove = parent.children.indexOf(child);
    parent.children.splice(indexToRemove, 1);

    expect(parent.children).not.toContain(child);
  });

  it('should handle a user in "children" role with children of their own', () => {
    const grandparent = new User('1', 'Grandparent', 'User', 60, 5000, [], 'Max', '567 Maple St', 'JKL012', Status.VIP);
    const parent = new User('2', 'Parent', 'User', 35, 2000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const child = new User('3', 'Child', 'User', 10, 0, [], 'Sparky', '987 Birch St', 'GHI789', Status.Outdated);

    grandparent.children.push(parent);
    parent.children.push(child);

    expect(grandparent.children).toContain(parent);
    expect(parent.children).toContain(child);
  });

  it('should calculate the total money of the user and their children', () => {
    const parent = new User('1', 'Parent', 'User', 35, 2000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const child1 = new User('2', 'Child1', 'User', 10, 500, [], 'Sparky', '987 Birch St', 'GHI789', Status.Outdated);
    const child2 = new User('3', 'Child2', 'User', 8, 300, [], 'Fluffy', '654 Pine St', 'JKL321', Status.Regular);

    parent.children.push(child1, child2);

    const totalMoney = parent.getTotalMoney();

    expect(totalMoney).toBe(2800); // 2000 (parent) + 500 (child1) + 300 (child2)
  });

  it('should check if the user is eligible for a discount', () => {
    const regularUser = new User('1', 'Regular', 'User', 25, 1000, [], 'Fido', '123 Oak St', 'MNO456', Status.Regular);
    const vipUser = new User('2', 'VIP', 'User', 40, 5000, [], 'Rex', '987 Maple St', 'PQR789', Status.VIP);
    const adminUser = new User('3', 'Admin', 'User', 30, 2000, [], 'Whiskers', '456 Cedar St', 'STU012', Status.Admin);

    expect(regularUser.isEligibleForDiscount()).toBe(false);
    expect(vipUser.isEligibleForDiscount()).toBe(true);
    expect(adminUser.isEligibleForDiscount()).toBe(true);
  });

  it('should initiate a user with a child who has a child', () => {
    const grandparent = new User(
      '1', 
      'Grandparent',
      'User',
      60,
      5000,
      [
        new User(
          '2', 
          'Parent',
          'User',
          35,
          2000,
          [
            new User('3', 'Child', 'User', 10, 0, [], 'Sparky', '987 Birch St', 'GHI789', Status.Outdated),
          ],
          'Buddy',
          '789 Elm St',
          'DEF456',
          Status.Regular
        ),
      ],
      'Max',
      '567 Maple St',
      'JKL012',
      Status.VIP
    );

    // Accessing the nested structure
    const parent = grandparent.children[0];
    const child = parent.children[0];

    expect(grandparent.firstName).toBe('Grandparent');
    expect(parent.firstName).toBe('Parent');
    expect(child.firstName).toBe('Child');
    expect(grandparent.getTotalMoney()).toBe(7000); // Corrected expectation to 7000
    expect(parent.getTotalMoney()).toBe(2000); // Total money of parent and their descendants
    expect(child.getTotalMoney()).toBe(0); // Total money of child and their descendants
     expect(parent.isEligibleForDiscount()).toBe(false); // Parent is not VIP or Admin
    expect(child.isEligibleForDiscount()).toBe(false); // Child is not VIP or Admin
  });

  it('should increment the age of the user and their children until a certain age', () => {
    const parent = new User('1', 'Parent', 'User', 35, 2000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const child = new User('2', 'Child', 'User', 10, 0, [], 'Sparky', '987 Birch St', 'GHI789', Status.Outdated);

    parent.children.push(child);

    parent.incrementAgeUntil(40);

    expect(parent.age).toBe(40);
  });

  it('should categorize users based on their age', () => {
    const childUser = new User('1', 'Child', 'User', 10, 0, [], 'Fido', '123 Oak St', 'MNO456', Status.Regular);
    const adultUser = new User('2', 'Adult', 'User', 25, 1000, [], 'Rex', '987 Maple St', 'PQR789', Status.VIP);
    const seniorUser = new User('3', 'Senior', 'User', 65, 3000, [], 'Whiskers', '456 Cedar St', 'STU012', Status.Admin);

    expect(childUser.categorizeUserByAge()).toBe('Child');
    expect(adultUser.categorizeUserByAge()).toBe('Adult');
    expect(seniorUser.categorizeUserByAge()).toBe('Senior');
  });

  it('should check if the user is a teenager', () => {
    const teenagerUser = new User('1', 'Teen', 'User', 16, 0, [], 'Fido', '123 Oak St', 'MNO456', Status.Regular);
    const adultUser = new User('2', 'Adult', 'User', 25, 1000, [], 'Rex', '987 Maple St', 'PQR789', Status.VIP);

    expect(teenagerUser.isTeenager()).toBe(true);
    expect(adultUser.isTeenager()).toBe(false);
  });

  it('should check if the user is a senior citizen', () => {
    const seniorUser = new User('1', 'Senior', 'User', 70, 3000, [], 'Whiskers', '456 Cedar St', 'STU012', Status.Admin);
    const adultUser = new User('2', 'Adult', 'User', 45, 2000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);

    expect(seniorUser.isSeniorCitizen()).toBe(true);
    expect(adultUser.isSeniorCitizen()).toBe(false);
  });

  it('should calculate the retirement age', () => {
    const user = new User('1', 'User', 'Test', 35, 2000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);

    expect(user.calculateRetirementAge()).toBe(65);
  });

  it('should calculate years until retirement for an adult user', () => {
    const adultUser = new User('1', 'Adult', 'User', 40, 2000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const yearsToRetired = adultUser.calculateYearsToRetired();

    expect(yearsToRetired).toBe(25); // Retirement age is assumed to be 65
  });

  it('should calculate years until retirement for a user already at retirement age', () => {
    const seniorUser = new User('1', 'Senior', 'User', 65, 3000, [], 'Whiskers', '456 Cedar St', 'STU012', Status.Admin);
    const yearsToRetired = seniorUser.calculateYearsToRetired();

    expect(yearsToRetired).toBe(0); // Already at retirement age
  });

  it('should calculate years until retirement for a teenager', () => {
    const teenagerUser = new User('1', 'Teen', 'User', 16, 0, [], 'Fido', '123 Oak St', 'MNO456', Status.Regular);
    const yearsToRetired = teenagerUser.calculateYearsToRetired();

    expect(yearsToRetired).toBe(49); // Retirement age is assumed to be 65
  });

  it('should propose a new status for a user with low money', () => {
    const user = new User('1', 'User', 'Test', 35, 500, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const newStatus = user.proposeNewStatus();

    expect(newStatus).toBe(Status.Outdated);
  });

  it('should propose a new status for a user with moderate money', () => {
    const user = new User('1', 'User', 'Test', 35, 3000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const newStatus = user.proposeNewStatus();

    expect(newStatus).toBe(Status.Regular);
  });

  it('should propose a new status for a user with high money', () => {
    const user = new User('1', 'User', 'Test', 35, 8000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const newStatus = user.proposeNewStatus();

    expect(newStatus).toBe(Status.VIP);
  });

  it('should propose a new status for a user with very high money', () => {
    const user = new User('1', 'User', 'Test', 35, 12000, [], 'Buddy', '789 Elm St', 'DEF456', Status.Regular);
    const newStatus = user.proposeNewStatus();

    expect(newStatus).toBe(Status.Admin);
  });

});
