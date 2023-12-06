import { toRoman } from './toRoman'; 

describe('toRoman', () => {
  test('converts 1 to "I"', () => {
    expect(toRoman(1)).toBe('I');
  });

  test('converts 4 to "IV"', () => {
    expect(toRoman(4)).toBe('IV');
  });

  test('converts 9 to "IX"', () => {
    expect(toRoman(9)).toBe('IX');
  });

  test('converts 58 to "LVIII"', () => {
    expect(toRoman(58)).toBe('LVIII');
  });

  test('converts 1994 to "MCMXCIV"', () => {
    expect(toRoman(1994)).toBe('MCMXCIV');
  });

  test('converts 3999 to "MMMCMXCIX"', () => {
    expect(toRoman(3999)).toBe('MMMCMXCIX');
  });

  test('returns an empty string for 0', () => {
    expect(toRoman(0)).toBe('');
  });

  // Add more test cases as needed
});
