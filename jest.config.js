module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: 'babel',
  reporters: ['default'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  // Other Jest configuration options...
};
