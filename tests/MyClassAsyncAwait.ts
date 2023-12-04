class MyClassAsyncAwait {
    private value: number;
  
    constructor(value: number) {
      this.value = value;
    }
  
    getValue(): Promise<number> {
      return Promise.resolve(this.value);
    }
  
    multiplyByAsync(factor: number): Promise<number> {
      return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation
        setTimeout(() => {
          if (typeof factor !== 'number') {
            reject(new Error('Invalid factor'));
          } else {
            resolve(this.value * factor);
          }
        }, 1000);
      });
    }
  
    // Helper method to demonstrate chaining promises
    addAsync(value: number): Promise<number> {
      return new Promise((resolve) => {
        // Simulate an asynchronous operation
        setTimeout(() => {
          resolve(this.value + value);
        }, 500);
      });
    }
  }
  
  export default MyClassAsyncAwait;