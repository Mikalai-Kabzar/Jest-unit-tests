// MyClassGetMockName.test.ts
import MyClassGetMockName from './MyClassGetMockName';

describe('MyClassGetMockName', () => {
  it('should create an instance of MyClassGetMockName', () => {
    const instance = new MyClassGetMockName(5);
    expect(instance).toBeTruthy();
  });

  it('should mock the getValue method using mockReturnValue', () => {
    // Arrange
    const instance = new MyClassGetMockName(10);
    const mockGetValue = jest.fn().mockReturnValue(42);

    // Replace the original method with the mock
    instance.getValue = mockGetValue;

    // Act
    const result = instance.getValue();

    // Assert
    expect(result).toBe(42);
  });

  it('should mock the multiplyBy method using mockImplementation', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn().mockImplementation((factor: number) => factor * 20);

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    const result = instance.multiplyBy(3);

    // Assert
    expect(result).toBe(60);
  });

  it('should mock the multiplyBy method using mockImplementationOnce', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn()
      .mockImplementationOnce((factor: number) => factor * 2)
      .mockImplementationOnce((factor: number) => factor * 3);

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    const result1 = instance.multiplyBy(3);
    const result2 = instance.multiplyBy(4);

    // Assert
    expect(result1).toBe(6);
    expect(result2).toBe(12);
  });

  it('should mock the getValue method using mockReturnThis', () => {
    // Arrange
    const instance = new MyClassGetMockName(10);
    const mockGetValue = jest.fn().mockReturnThis();

    // Replace the original method with the mock
    instance.getValue = mockGetValue;

    // Act
    const result = instance.getValue();

    // Assert
    expect(result).toBe(instance);
  });

  it('should mock the getValue method using mockName', () => {
    // Arrange
    const instance = new MyClassGetMockName(10);
    const mockGetValue = jest.fn(() => 42).mockName('customGetValue');

    // Replace the original method with the mock
    instance.getValue = mockGetValue;

    // Act
    const result = instance.getValue();

    // Assert
    expect(result).toBe(42);
    expect(mockGetValue.getMockName()).toBe('customGetValue');
  });

  it('should check if multiplyBy method has been called', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn();

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    instance.multiplyBy(3);

    // Assert
    expect(mockMultiplyBy).toHaveBeenCalled();
  });

  it('should check if multiplyBy method has been called with specific arguments', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn();

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    instance.multiplyBy(3);

    // Assert
    expect(mockMultiplyBy).toHaveBeenCalledWith(3);
  });

  it('should check if multiplyBy method has been last called with specific arguments', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn();

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    instance.multiplyBy(3);
    instance.multiplyBy(51);
    instance.multiplyBy(4);

    // Assert
    expect(mockMultiplyBy).toHaveBeenLastCalledWith(4);
  });

  it('should match snapshot for getValue method', () => {
    // Arrange
    const instance = new MyClassGetMockName(10);
    const mockGetValue = jest.fn(() => 42);

    // Replace the original method with the mock
    instance.getValue = mockGetValue;

    // Act
    const result = instance.getValue();

    // Assert
    expect(result).toMatchSnapshot();
  });

  it('should check the number of calls to multiplyBy method', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn();

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    instance.multiplyBy(3);
    instance.multiplyBy(30);
    instance.multiplyBy(31);
    instance.multiplyBy(4);

    // Assert
    expect(mockMultiplyBy.mock.calls.length).toBe(4);
  });

  it('should check the calls array for multiplyBy method', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn();

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    instance.multiplyBy(3);
    instance.multiplyBy(4);
    instance.multiplyBy(3);
    instance.multiplyBy(4);

    // Assert
    expect(mockMultiplyBy.mock.calls).toEqual([[3], [4], [3], [4]]);
  });
});
