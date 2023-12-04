import MyClassToUseStringMatchers from './MyClassToUseStringMatchers';

describe('MyClassToUseStringMatchers', () => {
  it('should create an instance of MyClassToUseStringMatchers', () => {
    const instance = new MyClassToUseStringMatchers('Hello');
    expect(instance).toBeTruthy();
  });

  it('should return the correct value', () => {
    const instance = new MyClassToUseStringMatchers('Hello');
    expect(instance.getValue()).toBe('Hello');
  });

  it('should concatenate strings correctly', () => {
    const instance = new MyClassToUseStringMatchers('Hello');
    expect(instance.concatenateString(' World')).toBe('Hello World');
  });

  it('should check if a value matches a specific string or regex', () => {
    const instance = new MyClassToUseStringMatchers('Hello World');
    expect(instance.getValue()).toMatch('Hello');
    expect(instance.getValue()).toMatch(/World/);
  });

  it('should check if a value does not match a specific string or regex', () => {
    const instance = new MyClassToUseStringMatchers('Hello World');
    expect(instance.getValue()).not.toMatch('Hola');
    expect(instance.getValue()).not.toMatch(/Hola/);
  });
});