import MyClassAsyncAwait from './MyClassAsyncAwait';

describe('MyClassAsyncAwait', () => {
  it('should create an instance of MyClassAsyncAwait', async () => {
    const instance = new MyClassAsyncAwait(5);
    expect(instance).toBeTruthy();
  });

  it('should return the correct value asynchronously', async () => {
    const instance = new MyClassAsyncAwait(10);
    await expect(instance.getValue()).resolves.toBe(10);
  });

  it('should multiply the value asynchronously', async () => {
    const instance = new MyClassAsyncAwait(5);
    const result = await instance.multiplyByAsync(3);
    expect(result).toBe(15);
  });

  it('should chain promises correctly', async () => {
    const instance = new MyClassAsyncAwait(2);
    const result = await instance.addAsync(3).then((sum) => instance.multiplyByAsync(sum));
    expect(result).toBe(10);
  });

  it('should handle multiple promises', async () => {
    const instance = new MyClassAsyncAwait(4);

    // Using `resolves` directly with async/await
    await expect(instance.multiplyByAsync(2)).resolves.toBe(8);
    await expect(instance.addAsync(3)).resolves.toBe(7);
  });

  it('should reject the promise with proper error message', async () => {
    const instance = new MyClassAsyncAwait(3);
    let undefinedFactor: any;

    // Using `rejects` directly with async/await
    await expect(instance.multiplyByAsync(undefinedFactor)).rejects.toThrow('Invalid factor');
  });

  it('should handle pending promises with async/await', async () => {
    const instance = new MyClassAsyncAwait(3);
    const pendingPromise = instance.multiplyByAsync(2);

    expect(pendingPromise instanceof Promise).toBeTruthy();

    await expect(pendingPromise).resolves.not.toBeNull();
    await expect(pendingPromise).resolves.not.toThrow();

    expect(pendingPromise).toBeInstanceOf(Promise);
    expect(typeof pendingPromise).toBe('object');
    expect(typeof await pendingPromise).not.toBe('object');
    expect(typeof await pendingPromise).toBe('number');
  });
});