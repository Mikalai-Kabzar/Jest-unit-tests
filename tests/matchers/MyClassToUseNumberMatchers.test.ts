import MyClassToUseNumberMatchers from './MyClassToUseNumberMatchers';

describe('MyClassToUseNumberMatchers', () => {
  it('should create an instance of MyClassToUseNumberMatchers', () => {
    const instance = new MyClassToUseNumberMatchers(42);
    expect(instance).toBeTruthy();
  });

  it('should return the correct value', () => {
    const instance = new MyClassToUseNumberMatchers(42);
    expect(instance.getValue()).toBe(42);
  });

  it('should add numbers correctly', () => {
    const instance = new MyClassToUseNumberMatchers(10);
    expect(instance.addNumber(5)).toBe(15);
  });

  it('should check if a value is equal to a specific value', () => {
    const instance = new MyClassToUseNumberMatchers(42);
    expect(instance.getValue()).toEqual(42);
  });

  it('should check if a value is greater than a specific value', () => {
    const instance = new MyClassToUseNumberMatchers(42);
    expect(instance.getValue()).toBeGreaterThan(30);
  });

  it('should check if a value is greater than or equal to a specific value', () => {
    const instance = new MyClassToUseNumberMatchers(42);
    expect(instance.getValue()).toBeGreaterThanOrEqual(42);
  });

  it('should check if a value is less than a specific value', () => {
    const instance = new MyClassToUseNumberMatchers(42);
    expect(instance.getValue()).toBeLessThan(50);
  });

  it('should check if a value is less than or equal to a specific value', () => {
    const instance = new MyClassToUseNumberMatchers(42);
    expect(instance.getValue()).toBeLessThanOrEqual(42);
  });

  it('should check if a value is close to a specific value with a precision', () => {
    const instance = new MyClassToUseNumberMatchers(3.14159);
    expect(instance.getValue()).toBeCloseTo(3.14, 2); // Close to 2 decimal places
  });
});