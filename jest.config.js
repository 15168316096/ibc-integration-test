const { JestConfigWithTsJest } = require('ts-jest');

const config = {
    verbose: true,
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    setupFilesAfterEnv: ['./jest.setup.ts'],
    "reporters": [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Test Report"
        }]
    ]
};

module.exports = config;