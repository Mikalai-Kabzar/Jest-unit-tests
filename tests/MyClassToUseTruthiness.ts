class MyClassToUseTruthiness {
    private value: number;
  
    constructor(value: number) {
      this.value = value;
    }
  
    getValue(): number {
      return this.value;
    }
  
    isPositive(): boolean {
      return this.value > 0;
    }
  }
  
  export default MyClassToUseTruthiness;