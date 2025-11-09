module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFiles: ['dotenv/config'],
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'clover'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/models/'
  ]
};