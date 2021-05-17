const {URL} = require('url');
const config = require('./platform/lib/config.js');

module.exports = {
  preset: 'jest-puppeteer',
  globals: {
    platformUrl: (path) => {
      return new URL(path, config.hosts.platform.base).toString();
    },
  },
  testMatch: ['**/*.e2e-test.js'],
  moduleNameMapper: {
    // TODO: improve: jest will not work with 'module-alias', so we have define the alias here again!
    // see https://github.com/ilearnio/module-alias/issues/46
    '^@lib/utils$': '<rootDir>/platform/lib/utils/index.js',
    '^@lib/(.*?)(.js)?$': '<rootDir>/platform/lib/$1.js',
    '^@examples/(.*?)(.js)?$': '<rootDir>/examples/$1.js',
    '^@examples$': '<rootDir>/examples/index.js',
    '^@boilerplate/(.*?)(.js)?$': '<rootDir>/boilerplate/$1.js',
    '\\.(css|less|sass|scss)$': '<rootDir>/platform/lib/utils/noop.js',
    '\\.(html|hbs|j2|njk)$': '<rootDir>/platform/lib/utils/noop.js',
  },
  verbose: false,
};
