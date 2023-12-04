import MyClassCallback from './MyClassCallback';

describe('MyClassCallback', () => {
  it('should create an instance of MyClassCallback', () => {
    const instance = new MyClassCallback(5);
    expect(instance).toBeTruthy();
  });

  it('should return the correct value asynchronously with callback', (done) => {
    const instance = new MyClassCallback(10);
    instance.getValue((result) => {
      expect(result).toBe(10);
      done();
    });
  });

  it('should multiply the value asynchronously with callback', (done) => {
    const instance = new MyClassCallback(5);
    instance.multiplyByAsync(3, (result) => {
      expect(result).toBe(15);
      done();
    }, (error) => {
      done.fail(error);
    });
  });

  it('should chain callbacks correctly', (done) => {
    const instance = new MyClassCallback(2);
    instance.addAsync(3, (sum) => {
      instance.multiplyByAsync(sum, (result) => {
        expect(result).toBe(10);
        done();
      }, (error) => {
        done.fail(error);
      });
    });
  });

  it('should handle multiple callbacks', (done) => {
    const instance = new MyClassCallback(4);

    instance.multiplyByAsync(2, (result1) => {
      expect(result1).toBe(8);
      instance.addAsync(3, (result2) => {
        expect(result2).toBe(7);
        done();
      });
    }, (error) => {
      done.fail(error);
    });
  });

  it('should handle multiple callbacks using nested callbacks', (done) => {
    const instance = new MyClassCallback(3);

    instance.multiplyByAsync(2, (result1) => {
      instance.addAsync(5, (result2) => {
        expect(result1).toBe(6);
        expect(result2).toBe(8);
        done();
      });
    }, (error) => {
      done.fail(error);
    });
  });

  it('should handle errors with proper callback', (done) => {
    const instance = new MyClassCallback(3);
    let undefinedFactor: any;

    instance.multiplyByAsync(undefinedFactor, () => {
      done.fail('Success callback should not be called.');
    }, (error) => {
      expect(error.message).toBe('Invalid factor');
      done();
    });
  });
});
