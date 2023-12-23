// mathService.ts
export class MathService {
  square(value: number): number {
    return value * value;
  }
}

// calculator.ts
export class Calculator {
  private mathService: MathService;

  constructor(mathService: MathService) {
    this.mathService = mathService;
  }

  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  squareAndAdd(a: number, b: number): number {
    const squaredA = this.mathService.square(a);
    const squaredB = this.mathService.square(b);
    return this.add(squaredA, squaredB);
  }
}
describe('Jest Complex Example Tests', () => {
  let calculator: Calculator;
  let mathService: MathService;

  beforeEach(() => {
    mathService = new MathService();
    calculator = new Calculator(mathService);
  });

  // Dummy Test
  test('should square and add two numbers using a dummy', () => {
    const dummyValue = 5;

    const result = calculator.squareAndAdd(dummyValue, 3);

    expect(result).toBe(34); // (5^2) + (3^2) = 25 + 9 = 34
  });

  // Spy Test
  test('should spy on the square method of MathService', () => {
    const squareSpy = jest.spyOn(mathService, 'square');

    const result = calculator.squareAndAdd(2, 4);

    expect(squareSpy).toHaveBeenCalledTimes(2); // Called twice, once for 2^2 and once for 4^2
    expect(squareSpy).toHaveBeenCalledWith(2);
    expect(squareSpy).toHaveBeenCalledWith(4);
    expect(result).toBe(20); // (2^2) + (4^2) = 4 + 16 = 20

    squareSpy.mockRestore();
  });

  // Stub Test
  test('should stub the add method', () => {
    const addStub = jest.fn().mockReturnValue(30);
    jest.spyOn(calculator, 'add').mockImplementation(addStub);

    const result = calculator.squareAndAdd(3, 2);

    expect(result).toBe(30);
    expect(addStub).toHaveBeenCalledWith(9, 4); // 3^2 + 2^2 = 9 + 4 = 13

    jest.restoreAllMocks();
  });

  // Mock Test
  test('should mock the square method of MathService', () => {
    const squareMock = jest.fn().mockReturnValue(100);
    jest.spyOn(mathService, 'square').mockImplementation(squareMock);

    const result = calculator.squareAndAdd(5, 2);

    expect(result).toBe(200); // (5^2) + (2^2) = 100 + 100 = 200
    expect(squareMock).toHaveBeenCalledWith(5);
    expect(squareMock).toHaveBeenCalledWith(2);
  });
});
