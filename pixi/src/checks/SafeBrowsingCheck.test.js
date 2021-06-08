/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';
import CheckCache from '../utils/checkCache';

import SafeBrowsingCheck from './SafeBrowsingCheck.js';
import {
  apiResponsePass,
  apiResponseFail,
} from '../../mocks/safeBrowsingCheck/apiResponse.js';

import pixiConfig from '../../config.js';

let cache;
let fetch;
let safeBrowsingCheck;

beforeEach(() => {
  fetch = fetchMock.sandbox();
  cache = new CheckCache();
  safeBrowsingCheck = new SafeBrowsingCheck(cache, fetch);
});

describe('Safe browsing check', () => {
  const apiEndpoint = pixiConfig['development'].API_ENDPOINT_SAFE_BROWSING;

  it('returns empty object as report data for safe url', async () => {
    fetch.mock(`begin:${apiEndpoint}`, apiResponsePass);

    const report = await safeBrowsingCheck.run('https://example.com');
    expect(report.error).toBeFalsy();
    expect(report.data.safeBrowsing).toBe(true);
  });

  it('returns threats for unsafe url', async () => {
    fetch.mock(`begin:${apiEndpoint}`, apiResponseFail);

    const report = await safeBrowsingCheck.run('http://evil.com');
    expect(report.error).toBeFalsy();
    expect(report.data.safeBrowsing).toBe(false);
  });

  it('throws for invalid API response', async () => {
    fetch.mock(`begin:${apiEndpoint}`, 500);

    const report = await safeBrowsingCheck.run('htp:/malformed');
    expect(report.error).toBeDefined();
    expect(report.data.safeBrowsing).toBe(undefined);
  });
});
