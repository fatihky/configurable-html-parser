import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest-matchers.ts'],
  testEnvironment: 'node',
};

export default config;
