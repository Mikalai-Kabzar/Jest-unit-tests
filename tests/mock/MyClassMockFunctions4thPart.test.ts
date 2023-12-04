// MyClassGetMockName.test.ts
import MyClassGetMockName from './MyClassGetMockName';

// Mocking the entire class using jest.mocked()
jest.mock('./MyClassGetMockName');
const MockedMyClass = jest.mocked(MyClassGetMockName, { shallow: true });
describe('MyClassGetMockName', () => {
  it('should create an instance of MyClassGetMockName', () => {
    // Arrange
    const instance = new MyClassGetMockName(5);

    // Assert
    expect(instance).toBeTruthy();
  });

  it('should mock the getValue method using jest.mocked()', () => {
    // Arrange
    MockedMyClass.mockImplementation(() => ({
      getValue: jest.fn().mockReturnValue(42),
      multiplyBy: jest.fn().mockReturnValue(0), // Mocking other methods as well for demonstration
    } as any));

    // Act
    const instance = new MyClassGetMockName(10);
    const result = instance.getValue();

    // Assert
    expect(result).toBe(42);
  });

  it('should mock the multiplyBy method using jest.mocked()', () => {
    // Arrange
    MockedMyClass.mockImplementation(() => ({
      getValue: jest.fn().mockReturnValue(0),
      multiplyBy: jest.fn().mockReturnValue(21),
    } as any));

    // Act
    const instance = new MyClassGetMockName(5);
    const result = instance.multiplyBy(3);

    // Assert
    expect(result).toBe(21);
  });

  it('should restore the original implementation after mocking', () => {
 
    
    
    
    // Arrange
    const instance = new MyClassGetMockName(5);


    MockedMyClass.mockImplementation(() => ({
      getValue: jest.fn().mockReturnValue(42),
      multiplyBy: jest.fn().mockReturnValue(21),
    } as any));

    // Act
    
    const resultMocked = instance.multiplyBy(3);

    // Restore the original implementation
    MockedMyClass.mockRestore();

    // Act after restoration
    const resultOriginal = instance.multiplyBy(3);

    // Assert
    expect(resultMocked).toBe(21);
    expect(resultOriginal).toBe(15);
  });

  it('should mock the getValue method using jest.mocked()', () => {
    // Arrange
    MockedMyClass.mockReturnValue({
      getValue: jest.fn().mockReturnValue(42),
      multiplyBy: jest.fn().mockReturnValue(0),
    } as any);

    // Act
    const instance = new MyClassGetMockName(10);
    const result = instance.getValue();

    // Assert
    expect(result).toBe(42);
  });
});
