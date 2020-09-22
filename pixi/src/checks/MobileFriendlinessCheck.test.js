/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

import MobileFriendlinessCheck from './MobileFriendlinessCheck.js';
import apiResponse from '../../mocks/mobileFriendlinessCheck/apiResponse.js';

import pixiConfig from '../../config.js';

beforeEach(() => {
  fetchMock.reset();
});

describe('Mobile Friendliness check', () => {
  const apiEndpoint =
    pixiConfig['development'].API_ENDPOINT_MOBILE_FRIENDLINESS;
  const mobileFriendlinessCheck = new MobileFriendlinessCheck();

  it('returns true for a mobile friendly URL', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponse.mobileFriendly);

    const report = await mobileFriendlinessCheck.run(
      'http://mobile-friendly.com'
    );
    expect(report.error).toBeFalsy();
    expect(report.data.mobileFriendly).toBe(true);
    expect(report.data.resourcesLoadable).toBe(true);
  });

  it('returns true for a mobile friendly URL that has isues', async () => {
    fetchMock.mock(
      `begin:${apiEndpoint}`,
      apiResponse.mobileFriendlyWithIssues
    );

    const report = await mobileFriendlinessCheck.run(
      'http://a-little-mobile-friendly.com'
    );
    expect(report.error).toBeFalsy();
    expect(report.data.mobileFriendly).toBe(true);
    expect(report.data.resourcesLoadable).toBe(false);
  });

  it('returns false for a mobile unfriendly URL', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponse.notMobileFriendly);

    const report = await mobileFriendlinessCheck.run(
      'http://mobile-unfriendly.com'
    );
    expect(report.error).toBeFalsy();
    expect(report.data.mobileFriendly).toBe(false);
  });

  describe('returns false if the upstream API', () => {
    it('could not reach the page', async () => {
      fetchMock.mock(`begin:${apiEndpoint}`, apiResponse.pageUnreachable);
      const report = await mobileFriendlinessCheck.run(
        'http://unreachable.com'
      );
      expect(report.error).toBeDefined();
    });

    it('could not complete the test', async () => {
      fetchMock.mock(`begin:${apiEndpoint}`, apiResponse.unspecifiedStatus);
      const report = await mobileFriendlinessCheck.run(
        'http://mobile-unfriendly.com'
      );
      expect(report.error).toBeDefined();
    });

    it('has infrastructure problems', async () => {
      fetchMock.mock(`begin:${apiEndpoint}`, apiResponse.internalError);
      const report = await mobileFriendlinessCheck.run('http://500error.com');
      expect(report.error).toBeDefined();
    });
  });
});
