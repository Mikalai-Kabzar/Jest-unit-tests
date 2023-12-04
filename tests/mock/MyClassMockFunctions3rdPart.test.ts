// MyClassGetMockName.test.ts
import MyClassGetMockName from './MyClassGetMockName';

describe('MyClassGetMockName', () => {
  it('should match snapshot for multiplyBy method with specific argument', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn();

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    instance.multiplyBy(3);

    // Assert
    expect(mockMultiplyBy).toHaveBeenCalledWith(3);
    expect(mockMultiplyBy).toMatchSnapshot();
  });

  it('should match snapshot for multiplyBy method with different argument', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn();

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    instance.multiplyBy(4);

    // Assert
    expect(mockMultiplyBy).toHaveBeenCalledWith(4);
    expect(mockMultiplyBy).toMatchSnapshot();
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

  it('should match snapshot for multiplyBy method with mockImplementation', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn().mockImplementation((factor: number) => factor * 2);

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    const result = instance.multiplyBy(3);

    // Assert
    expect(result).toMatchSnapshot();
  });

  it('should match snapshot for multiplyBy method with mockReturnValue', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);
    const mockMultiplyBy = jest.fn().mockReturnValue(42);

    // Replace the original method with the mock
    instance.multiplyBy = mockMultiplyBy;

    // Act
    const result = instance.multiplyBy(3);

    // Assert
    expect(result).toMatchSnapshot();
  });
});
