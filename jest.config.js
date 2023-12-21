module.exports = {
  preset: 'ts-jest',
  //testEnvironment: ['node'],
  testEnvironment: 'allure-jest/jsdom',
  coverageProvider: 'babel',

  reporters: ['default'],

  // reporters: ['default',   
  // ["jest-html-reporters", {
  //   "publicPath": "./html-report",
  //   "filename": "report.html",
  //   "openReport": true
  // }]],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  // globals: {
  //   'ts-jest': {
  //     tsconfig: './tsconfig.json',
  //   },
  // },
  testRunner: "jest-jasmine2",
  setupFilesAfterEnv: ["jest-allure/dist/setup"]
  // Other Jest configuration options...
};