/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

import LinterCheck from './LinterCheck.js';
import {
  apiResponsePass,
  apiResponseFail,
} from '../../mocks/linterCheck/apiResponse.js';

import pixiConfig from '../../config.js';

beforeEach(() => {
  fetchMock.reset();
});

describe('Linter check', () => {
  const apiEndpoint = pixiConfig['development'].API_ENDPOINT_LINTER;
  const linterCheck = new LinterCheck();


  it('returns object with "usesHttps: true" for url with https protocol', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponsePass);

    const report = await linterCheck.run('http://example.com');
    expect(report.data.usesHttps).toBe(true);
  });

  it('returns object with "usesHttps: false" for url with http protocol', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponseFail);

    const report = await linterCheck.run('http://example.com');
    expect(report.data.usesHttps).toBe(false);
  });

  it('throws for invalid API response', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, 500);

    const report = await linterCheck.run('http://example.com');
    expect(report.error).toBeDefined();
    expect(report.data).toBe(undefined);
  });
});
