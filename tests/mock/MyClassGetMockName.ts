class MyClassGetMockName {
    private value: number;
  
    constructor(value: number) {
      this.value = value;
    }
  
    getValue(): number {
      return this.value;
    }
  
    multiplyBy(factor: number): number {
      return this.value * factor;
    }
  }
  
  export default MyClassGetMockName;