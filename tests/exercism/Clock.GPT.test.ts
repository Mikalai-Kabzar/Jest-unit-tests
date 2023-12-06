import { Clock } from './Clock';

describe('Clock', () => {
  test('constructor sets hour and minute', () => {
    const clock = new Clock(12, 30);
    expect(clock.toString()).toBe('12:30');
  });

  test('constructor sets hour only', () => {
    const clock = new Clock(8);
    expect(clock.toString()).toBe('08:00');
  });

  test('toString pads single-digit hour and minute', () => {
    const clock = new Clock(9, 5);
    expect(clock.toString()).toBe('09:05');
  });

  test('plus adds minutes to the time', () => {
    const clock = new Clock(10, 15);
    clock.plus(30);
    expect(clock.toString()).toBe('10:45');
  });

  test('minus subtracts minutes from the time', () => {
    const clock = new Clock(14, 45);
    clock.minus(15);
    expect(clock.toString()).toBe('14:30');
  });

  test('plus handles overflow into the next hour', () => {
    const clock = new Clock(23, 45);
    clock.plus(30);
    expect(clock.toString()).toBe('00:15');
  });

  test('minus handles underflow into the previous hour', () => {
    const clock = new Clock(1, 30);
    clock.minus(45);
    expect(clock.toString()).toBe('00:45');
  });

  test('equals compares two clocks', () => {
    const clock1 = new Clock(6, 15);
    const clock2 = new Clock(6, 15);
    const clock3 = new Clock(6, 30);

    expect(clock1.equals(clock2)).toBe(true);
    expect(clock1.equals(clock3)).toBe(false);
  });
});
