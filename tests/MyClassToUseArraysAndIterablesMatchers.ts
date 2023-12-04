class MyClassToUseArraysAndIterablesMatchers {
    private values: number[];
  
    constructor(values: number[]) {
      this.values = values;
    }
  
    getValues(): number[] {
      return this.values;
    }
  
    containsValue(value: number): boolean {
      return this.values.includes(value);
    }
  }
  
  export default MyClassToUseArraysAndIterablesMatchers;