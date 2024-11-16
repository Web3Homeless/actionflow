// jest.config.js (ESM syntax)
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/tests/**/*.test.ts", "<rootDir>/src/tests/**/*.test.tsx"],
};
