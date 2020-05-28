module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts}"],
  coverageDirectory: "__tests__/coverage",
  setupFilesAfterEnv: ["./__tests__/setup.ts"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
  preset: "ts-jest",
};
