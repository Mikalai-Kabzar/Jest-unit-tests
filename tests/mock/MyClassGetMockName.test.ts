// mock/MyClassGetMockName.test.ts
import MyClassGetMockName from './MyClassGetMockName';


jest.mock('./MyClassGetMockName')

describe('MyClassGetMockName', () => {
  it('should create an instance of MyClassGetMockName', () => {
    const instance = new MyClassGetMockName(5);
    expect(instance).toBeTruthy();
  });

  it('should get the mock name for getValue', () => {
    const instance = new MyClassGetMockName(10);
    const mockGetValue = jest.fn(instance.getValue).mockName('mockGetValue');

    // Get the mock name using getMockName()
    const mockName = mockGetValue.getMockName();

    expect(mockName).toBe('mockGetValue');
  });

  it('should get the mock name for multiplyBy', () => {
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn(instance.multiplyBy).mockName('mockMultiplyBy');

    // Get the mock name using getMockName()
    const mockName = mockMultiplyBy.getMockName();

    expect(mockName).toBe('mockMultiplyBy');
  });

  it('should capture and check arguments using mockFn.mock.calls for getValue', () => {
    const instance = new MyClassGetMockName(10);
    const mockGetValue = jest.fn(instance.getValue);

    instance.getValue(); // Call the method

    // Check the arguments using mockFn.mock.calls
    expect(mockGetValue.mock.calls).toHaveLength(1);
    expect(mockGetValue.mock.calls[0]).toEqual([]);
  });

  it('should capture and check arguments using mockFn.mock.calls for multiplyBy', () => {
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn(instance.multiplyBy).mockName('mockMultiplyBy');

    instance.multiplyBy(33); // Call the method

    // Check the arguments using mockFn.mock.calls
    //expect(mockMultiplyBy.mock.calls).toHaveLength(1);
    expect(mockMultiplyBy.mock.calls[0]).toEqual([33]);
  });

  it('should capture and check results using mockFn.mock.results for getValue', () => {
    const instance = new MyClassGetMockName(10);
    const mockGetValue = jest.fn(instance.getValue).mockName('mockGetValue');

    instance.getValue(); // Call the method

    // Check the results using mockFn.mock.results
    expect(mockGetValue.mock.results).toHaveLength(1);
    expect(mockGetValue.mock.results[0].value).toBe(10);
  });

  it('should capture and check results using mockFn.mock.results for multiplyBy', () => {
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn(instance.multiplyBy).mockName('mockMultiplyBy');

    instance.multiplyBy(3); // Call the method

    // Check the results using mockFn.mock.results
    expect(mockMultiplyBy.mock.results).toHaveLength(1);
    expect(mockMultiplyBy.mock.results[0].value).toBe(15);
  });

  it('should capture and check instances using mockFn.mock.instances for getValue', () => {
    const instance = new MyClassGetMockName(10);
    const mockGetValue = jest.fn(instance.getValue).mockName('mockGetValue');

    instance.getValue(); // Call the method

    // Check the instances using mockFn.mock.instances
    expect(mockGetValue.mock.instances).toHaveLength(1);
    expect(mockGetValue.mock.instances[0]).toBe(instance);
  });

  it('should capture and check instances using mockFn.mock.instances for multiplyBy', () => {
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn(instance.multiplyBy).mockName('mockMultiplyBy');

    instance.multiplyBy(3); // Call the method

    // Check the instances using mockFn.mock.instances
    expect(mockMultiplyBy.mock.instances).toHaveLength(1);
    expect(mockMultiplyBy.mock.instances[0]).toBe(instance);
  });
});
