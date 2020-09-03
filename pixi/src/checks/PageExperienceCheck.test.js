/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

import PageExperienceCheck from './PageExperienceCheck.js';
import dummyApiResponse from '../../mocks/pageExperienceCheck/apiResponse.json';
import expectedReportData from '../../mocks/pageExperienceCheck/reportData.json';

import dummyApiErrorsResponse from '../../mocks/pageExperienceCheck/apiResponseErrors.json';
import expectedErrorsReportData from '../../mocks/pageExperienceCheck/reportDataErrors.json';

import pixiConfig from '../../config.js';

beforeEach(() => {
  fetchMock.reset();
});

describe('Page experience check', () => {
  it('creates report data for url with no errors', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetchMock.mock(`begin:${apiEndpoint}`, dummyApiResponse);

    const pageExperienceCheck = new PageExperienceCheck();
    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toMatchObject(expectedReportData);
  });

  it('creates report data for url with errors', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetchMock.mock(`begin:${apiEndpoint}`, dummyApiErrorsResponse);

    const pageExperienceCheck = new PageExperienceCheck();
    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toMatchObject(expectedErrorsReportData);
  });
});
