/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

import PageExperienceCheck from './PageExperienceCheck.js';
import dummyApiResponse from '../../mocks/pageExperienceCheck/apiResponse.json';
import expectedReportData from '../../mocks/pageExperienceCheck/reportData.json';

import pixiConfig from '../../config.js';

beforeAll(() => {
  fetchMock.reset();
});

describe('Page experience check', () => {
  it('creates report data for url', async () => {
    const apiEndpoint = pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetchMock.mock(`begin:${apiEndpoint}`, dummyApiResponse);

    const pageExperienceCheck = new PageExperienceCheck();
    const reportData = await pageExperienceCheck.run('http://example.com');
    expect(reportData).toMatchObject(expectedReportData);
  });
});
