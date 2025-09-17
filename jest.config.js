// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path ke root Next.js project
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // sesuaikan kalau folder kamu bukan "src"
  },
};

module.exports = createJestConfig(customJestConfig);
