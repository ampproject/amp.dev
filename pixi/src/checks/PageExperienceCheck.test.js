/**
 * @jest-environment jsdom
 */

import PageExperienceCheck from './PageExperienceCheck.js';
import dummyApiResponse from '../../mocks/pageExperienceCheck/apiResponse.json';
import expectedReportData from '../../mocks/pageExperienceCheck/reportData.json';

import fetchMock from 'fetch-mock';

beforeAll(() => {
  fetchMock.reset();
});

describe('Page experience check', () => {
  it('creates report data for url', async () => {
    fetchMock.mock('*', dummyApiResponse);

    const pageExperienceCheck = new PageExperienceCheck();
    const reportData = await pageExperienceCheck.run('https://example.com/');
    expect(reportData).toMatchObject(expectedReportData);
  });
});
