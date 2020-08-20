/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

import SafeBrowsingCheck from './SafeBrowsingCheck.js';
import {apiResponsePass, apiResponseFail} from '../../mocks/safeBrowsing/apiResponse.js';

import pixiConfig from '../../config.js';

beforeAll(() => {
  fetchMock.reset();
});

describe('Safe browsing check', () => {
  it('returns empty object as report data for safe url', async () => {
    const apiEndpoint = pixiConfig['development'].API_ENDPOINT_SAFE_BROWSING;
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponsePass);

    const safeBrowsingCheck = new SafeBrowsingCheck();
    const report = await safeBrowsingCheck.run('http://example.com');

    expect(report.data).toBe(true);
  });

  // it('returns threats for unsafe url', async () => {
  //
  // });
  //
  // it('throws for invalid API response', async () => {
  //
  // });
});
