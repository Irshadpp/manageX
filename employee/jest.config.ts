export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testMatch: ['**/__test__/**/*.test.ts'], 
    setupFilesAfterEnv: [
      "./src/test/setup.ts"
    ]
  };
  