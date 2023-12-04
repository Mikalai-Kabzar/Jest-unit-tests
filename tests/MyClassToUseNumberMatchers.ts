class MyClassToUseNumberMatchers {
    private value: number;
  
    constructor(value: number) {
      this.value = value;
    }
  
    getValue(): number {
      return this.value;
    }
  
    addNumber(num: number): number {
      return this.value + num;
    }
  }
  
  export default MyClassToUseNumberMatchers;