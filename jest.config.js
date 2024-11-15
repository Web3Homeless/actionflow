module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    // Add any other aliases you might be using
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
