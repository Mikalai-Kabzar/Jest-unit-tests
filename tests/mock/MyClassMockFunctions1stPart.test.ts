// MyClassGetMockName.test.ts
import MyClassGetMockName from './MyClassGetMockName';

describe('MyClassGetMockName', () => {
  it('should create an instance of MyClassGetMockName', () => {
    const instance = new MyClassGetMockName(5);
    expect(instance).toBeTruthy();
  });

  it('should mock the getValue method', () => {
    // Arrange
    const instance = new MyClassGetMockName(10);
    const mockGetValue = jest.spyOn(instance, 'getValue');

    // Act
    const result = instance.getValue();

    // Assert
    expect(mockGetValue).toHaveBeenCalledTimes(1);
    expect(result).toBe(10);
  });

  it('should mock the multiplyBy method', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.spyOn(instance, 'multiplyBy');

    // Act
    const result = instance.multiplyBy(3);

    // Assert
    expect(mockMultiplyBy).toHaveBeenCalledTimes(1);
    expect(mockMultiplyBy).toHaveBeenCalledWith(3);
    expect(result).toBe(15);
  });

  it('should handle multiple calls to multiplyBy with different factors', () => {
    // Arrange
    const instance = new MyClassGetMockName(2);
    const mockMultiplyBy = jest.spyOn(instance, 'multiplyBy');

    // Act
    const result1 = instance.multiplyBy(4);
    const result2 = instance.multiplyBy(2);

    // Assert
    expect(mockMultiplyBy).toHaveBeenCalledTimes(2);
    expect(mockMultiplyBy).toHaveBeenCalledWith(4);
    expect(mockMultiplyBy).toHaveBeenCalledWith(2);
    expect(result1).toBe(8);
    expect(result2).toBe(4);
  });

  it('should restore original implementation after mocking', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.spyOn(instance, 'multiplyBy');

    // Act
    mockMultiplyBy.mockImplementation((factor: number) => 42); // Mock implementation
    const resultMocked = instance.multiplyBy(3);

    mockMultiplyBy.mockRestore(); // Restore original implementation
    const resultOriginal = instance.multiplyBy(3);

    // Assert
    expect(resultMocked).toBe(42); // Mocked result
    expect(resultOriginal).toBe(15); // Original result
  });
});
