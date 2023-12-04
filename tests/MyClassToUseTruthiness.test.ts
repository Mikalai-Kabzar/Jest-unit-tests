import MyClassToUseTruthiness from './MyClassToUseTruthiness';

describe('MyClassToUseTruthiness', () => {
    it('should create an instance of MyClassToUseTruthiness', () => {
        const instance = new MyClassToUseTruthiness(42);
        expect(instance).toBeTruthy();
      });
    
      it('should return the correct value', () => {
        const instance = new MyClassToUseTruthiness(42);
        expect(instance.getValue()).toBe(42);
      });
    
      it('should correctly check if the value is positive using toBeTruthy/toBeFalsy', () => {
        const positiveInstance = new MyClassToUseTruthiness(42);
        const negativeInstance = new MyClassToUseTruthiness(-42);
    
        expect(positiveInstance.isPositive()).toBeTruthy();
        expect(negativeInstance.isPositive()).toBeFalsy();
      });
    
      it('should check if a value is null and defined', () => {
        let instance = null
        expect(instance).toBeNull();
        expect(instance).toBeDefined();
      });
        
      it('should check if a value is defined', () => {
        const instance = new MyClassToUseTruthiness(42);
        expect(instance.getValue()).toBeDefined();
      });
    
      it('should check if a value is undefined using toBeUndefined', () => {
        let instance: any
        expect(instance).toBeUndefined();
      });
    });