// MyClassGetMockName.test.ts
import MyClassGetMockName from './MyClassGetMockName';

jest.mock('./MyClassGetMockName');

(MyClassGetMockName as any).mockImplementation(() => ({
  getValue: jest.fn().mockReturnValue(41),
  multiplyBy: jest.fn().mockReturnValue(43),
}));

describe('MyClassGetMockName', () => {
  it('should mock getValue method with default implementation', () => {
    // Arrange
    const instance = new MyClassGetMockName(10);

    // Act
    const result = instance.getValue();

    // Assert
    expect(result).toBe(41);
  });

  it('should mock multiplyBy method with default implementation', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);

    // Act
    const result = instance.multiplyBy(3);

    // Assert
    expect(result).toBe(43);
  });

  it('should mock multiplyBy method with custom implementation', () => {
    // Arrange
    (MyClassGetMockName as any).mockImplementation(() => ({
      multiplyBy: jest.fn().mockReturnValue(42),
    }));

    // Act
    const instance = new MyClassGetMockName(7);
    const result = instance.multiplyBy(2);

    // Assert
    expect(result).toBe(42);
  });
});
