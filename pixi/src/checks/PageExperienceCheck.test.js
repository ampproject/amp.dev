/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

import PageExperienceCheck from './PageExperienceCheck.js';
import apiResponseNoErrors from '../../mocks/pageExperienceCheck/apiResponse.json';
import reportDataNoErrors from '../../mocks/pageExperienceCheck/reportData.json';
import apiResponseErrors from '../../mocks/pageExperienceCheck/apiResponseErrors.json';
import reportDataErrors from '../../mocks/pageExperienceCheck/reportDataErrors.json';
import apiResponseNoFieldData from '../../mocks/pageExperienceCheck/apiResponseNoFieldData.json';
import reportDataNoFieldData from '../../mocks/pageExperienceCheck/reportDataNoFieldData.json';
import reportDescriptions from '../../mocks/pageExperienceCheck/reportDescriptions.json';

import pixiConfig from '../../config.js';

beforeEach(() => {
  fetchMock.reset();
});

describe('Page experience check', () => {
  it('creates report data for url with no errors', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponseNoErrors);

    const pageExperienceCheck = new PageExperienceCheck();
    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataNoErrors);
    expect(report.descriptions).toEqual(reportDescriptions);
  });

  it('creates report data for url with errors', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponseErrors);

    const pageExperienceCheck = new PageExperienceCheck();
    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataErrors);
    expect(report.descriptions).toEqual(reportDescriptions);
  });

  it('creates report data for url with no field data', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponseNoFieldData);

    const pageExperienceCheck = new PageExperienceCheck();
    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataNoFieldData);
    expect(report.descriptions).toEqual(reportDescriptions);
  });
});
