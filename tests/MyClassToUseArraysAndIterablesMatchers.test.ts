import MyClassToUseArraysAndIterablesMatchers from './MyClassToUseArraysAndIterablesMatchers';

describe('MyClassToUseArraysAndIterablesMatchers', () => {
  it('should create an instance of MyClassToUseArraysAndIterablesMatchers', () => {
    const instance = new MyClassToUseArraysAndIterablesMatchers([1, 2, 3]);
    expect(instance).toBeTruthy();
  });

  it('should return the correct values', () => {
    const instance = new MyClassToUseArraysAndIterablesMatchers([1, 2, 3]);
    expect(instance.getValues()).toEqual([1, 2, 3]);
  });

  it('should check if a value is present in the array or iterable', () => {
    const instance = new MyClassToUseArraysAndIterablesMatchers([1, 2, 3]);

    expect(instance.getValues()).toContain(1);
    expect(instance.getValues()).toContain(2);
    expect(instance.getValues()).toContain(3);
  });

  it('should check if a value is not present in the array or iterable', () => {
    const instance = new MyClassToUseArraysAndIterablesMatchers([1, 2, 3]);

    expect(instance.getValues()).not.toContain(22);
    expect(instance.getValues()).not.toContain(-1);
  });

  it('should check if a value is present in the array or iterable using toBeTruthy/toBeFalsy', () => {
    const instance = new MyClassToUseArraysAndIterablesMatchers([1, 2, 3]);

    expect(instance.containsValue(2)).toBeTruthy();
    expect(instance.containsValue(4)).toBeFalsy();
  });
});