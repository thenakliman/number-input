module.exports = {
  "rootDir": "../",
  "verbose": true,
  "collectCoverage": true,
  "testPathIgnorePatterns": ["/node_modules/"],
  "collectCoverageFrom": ["./src/**/*.js"],
  "setupFiles": ["<rootDir>/config/setup.js"],
  "moduleNameMapper": {
        "\\.(css|scss|jpg|png)$": "identity-obj-proxy"
      },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 95,
      "lines": 81,
      "statements": -22
    }
  }
}
