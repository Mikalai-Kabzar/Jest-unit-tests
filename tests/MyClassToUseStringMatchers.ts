class MyClassToUseStringMatchers {
    private value: string;
  
    constructor(value: string) {
      this.value = value;
    }
  
    getValue(): string {
      return this.value;
    }
  
    concatenateString(str: string): string {
      return this.value + str;
    }
  }
  
  export default MyClassToUseStringMatchers;