/**
 * @jest-environment jsdom
 */

import PageExperienceCheck from './PageExperienceCheck.js';
import dummyApiResponse from '../../mocks/pageExperienceCheck/apiResponse.json';
import expectedReportData from '../../mocks/pageExperienceCheck/reportData.json';

beforeAll(() => {
  jest.spyOn(PageExperienceCheck.prototype, 'fetchJson').mockImplementation(() => {
    return dummyApiResponse
  });
});

describe('Page experience check', () => {
  test('create report data for url', async () => {
    const pageExperienceCheck = new PageExperienceCheck();
    const reportData = await pageExperienceCheck.run('https://example.com/');
    expect(reportData).toMatchObject(expectedReportData);
  });
});
