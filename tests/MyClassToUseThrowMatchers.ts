class MyClassToUseThrowMatchers {
    private throwError: boolean;
  
    constructor(throwError: boolean) {
      this.throwError = throwError;
    }
  
    execute(): void {
      if (this.throwError) {
        throw new Error('Something went wrong!');
      }
    }
  }
  
  export default MyClassToUseThrowMatchers;