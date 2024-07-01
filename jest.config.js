module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testTimeout: 10000,
};
