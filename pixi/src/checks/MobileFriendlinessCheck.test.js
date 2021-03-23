/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

import MobileFriendlinessCheck from './MobileFriendlinessCheck.js';
import apiResponse from '../../mocks/mobileFriendlinessCheck/apiResponse.js';

import pixiConfig from '../../config.js';
import CheckCache from '../utils/checkCache.js';

let cache;
let fetch;
let mobileFriendlinessCheck;

beforeEach(() => {
  fetchMock.reset();
  cache = new CheckCache();
  fetch = fetchMock.sandbox();
  mobileFriendlinessCheck = new MobileFriendlinessCheck(cache, fetch);
});

describe('Mobile Friendliness check', () => {
  const apiEndpoint =
    pixiConfig['development'].API_ENDPOINT_MOBILE_FRIENDLINESS;

  it('returns true for a mobile friendly URL', async () => {
    fetch.mock(`begin:${apiEndpoint}`, apiResponse.mobileFriendly);

    const report = await mobileFriendlinessCheck.run(
      'http://mobile-friendly.com'
    );
    expect(report.error).toBeFalsy();
    expect(report.data.mobileFriendly).toBe(true);
    expect(report.data.resourcesLoadable).toBe(true);
  });

  it('returns true for a mobile friendly URL that has isues', async () => {
    fetch.mock(`begin:${apiEndpoint}`, apiResponse.mobileFriendlyWithIssues);

    const report = await mobileFriendlinessCheck.run(
      'http://a-little-mobile-friendly.com'
    );
    expect(report.error).toBeFalsy();
    expect(report.data.mobileFriendly).toBe(true);
    expect(report.data.resourcesLoadable).toBe(false);
  });

  it('returns false for a mobile unfriendly URL', async () => {
    fetch.mock(`begin:${apiEndpoint}`, apiResponse.notMobileFriendly);

    const report = await mobileFriendlinessCheck.run(
      'http://mobile-unfriendly.com'
    );
    expect(report.error).toBeFalsy();
    expect(report.data.mobileFriendly).toBe(false);
  });

  describe('returns false if the upstream API', () => {
    it('could not reach the page', async () => {
      fetch.mock(`begin:${apiEndpoint}`, apiResponse.pageUnreachable);
      const report = await mobileFriendlinessCheck.run(
        'http://unreachable.com'
      );
      expect(report.error).toBeDefined();
    });

    it('could not complete the test', async () => {
      fetch.mock(`begin:${apiEndpoint}`, apiResponse.unspecifiedStatus);
      const report = await mobileFriendlinessCheck.run(
        'http://mobile-unfriendly.com'
      );
      expect(report.error).toBeDefined();
    });

    it('has infrastructure problems', async () => {
      fetch.mock(`begin:${apiEndpoint}`, apiResponse.internalError);
      const report = await mobileFriendlinessCheck.run('http://500error.com');
      expect(report.error).toBeDefined();
    });
  });
});
