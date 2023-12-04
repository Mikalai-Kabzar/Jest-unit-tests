import MyClassToUseThrowMatchers from './MyClassToUseThrowMatchers';

describe('MyClassToUseThrowMatchers', () => {
  it('should create an instance of MyClassToUseThrowMatchers', () => {
    const instance = new MyClassToUseThrowMatchers(false);
    expect(instance).toBeTruthy();
  });

  it('should execute without throwing an error using not.toThrow', () => {
    const instance = new MyClassToUseThrowMatchers(false);

    expect(() => instance.execute()).not.toThrow();
  });

  it('should execute and throw an error using toThrow', () => {
    const instance = new MyClassToUseThrowMatchers(true);

    expect(() => instance.execute()).toThrow();
  });

  it('should execute and throw a specific error using toThrow with error message', () => {
    const instance = new MyClassToUseThrowMatchers(true);

    expect(() => instance.execute()).toThrow('Something went wrong!');
  });

  it('should execute and throw an error with specific instance using toThrow with error instance', () => {
    const instance = new MyClassToUseThrowMatchers(true);

    expect(() => instance.execute()).toThrow(Error);
  });
});