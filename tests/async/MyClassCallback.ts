class MyClassCallback {
    private value: number;
    private timeout = 2;

    constructor(value: number) {
      this.value = value;
    }
  
    getValue(callback: (value: number) => void): void {
      callback(this.value);
    }
  
    multiplyByAsync(factor: number, callback: (result: number) => void, errorCallback: (error: Error) => void): void {
      // Simulate an asynchronous operation
      setTimeout(() => {
        if (typeof factor !== 'number') {
          errorCallback(new Error('Invalid factor'));
        } else {
          callback(this.value * factor);
        }
      }, this.timeout);
    }
  
    // Helper method to demonstrate chaining callbacks
    addAsync(value: number, callback: (result: number) => void): void {
      // Simulate an asynchronous operation
      setTimeout(() => {
        callback(this.value + value);
      }, this.timeout);
    }
  }
  
  export default MyClassCallback;