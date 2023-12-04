import MyClassAsyncPromises from './MyClassAsyncPromises';

describe('MyClassAsyncPromises', () => {
  it('should create an instance of MyClassAsyncPromises', async () => {
    const instance = new MyClassAsyncPromises(5);
    expect(instance).toBeTruthy();
  });

  it('should return the correct value asynchronously', async () => {
    const instance = new MyClassAsyncPromises(10);
    await expect(instance.getValue()).resolves.toBe(10);
  });

  it('should multiply the value asynchronously', async () => {
    const instance = new MyClassAsyncPromises(5);
    const result = await instance.multiplyByAsync(3);
    expect(result).toBe(15);
  });

  it('should chain promises correctly', async () => {
    const instance = new MyClassAsyncPromises(2);
    const result = await instance.addAsync(3).then((sum) => instance.multiplyByAsync(sum));
    expect(result).toBe(10);
  });

  it('should handle multiple promises', async () => {
    const instance = new MyClassAsyncPromises(4);
    await expect(instance.multiplyByAsync(2)).resolves.toBe(8);
    await expect(instance.addAsync(3)).resolves.toBe(7);
  });

  it('should handle multiple promises using Promise.all', async () => {
    const instance = new MyClassAsyncPromises(3);
    const [result1, result2] = await Promise.all([
      instance.multiplyByAsync(2),
      instance.addAsync(5),
    ]);
    expect(result1).toBe(6);
    expect(result2).toBe(8);
  });

  it('should reject the promise with proper error message', async () => {
    const instance = new MyClassAsyncPromises(3);
    let factor: any;
    await expect(instance.multiplyByAsync(factor)).rejects.toThrow('Invalid factor');
  });

  it('should handle pending promises', async () => {
    const instance = new MyClassAsyncPromises(3);
    const pendingPromise = instance.multiplyByAsync(2);

    expect(pendingPromise).toBeInstanceOf(Promise);
    expect(typeof pendingPromise).toBe('object');
    expect(typeof await pendingPromise).not.toBe('object');
    expect(typeof await pendingPromise).toBe('number');
  });
});