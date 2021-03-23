/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

/* eslint-disable max-len */
import PageExperienceCheck from './PageExperienceCheck.js';
import apiResponseNoErrors from '../../mocks/pageExperienceCheck/apiResponse.json';
import reportDataNoErrors from '../../mocks/pageExperienceCheck/reportData.json';
import apiResponseNoLoadingExperience from '../../mocks/pageExperienceCheck/apiResponseNoLoadingExperience.json';
import reportDataNoLoadingExperience from '../../mocks/pageExperienceCheck/reportDataNoLoadingExperience.json';
import apiResponseErrors from '../../mocks/pageExperienceCheck/apiResponseErrors.json';
import reportDataErrors from '../../mocks/pageExperienceCheck/reportDataErrors.json';
import apiResponseNoFieldData from '../../mocks/pageExperienceCheck/apiResponseNoFieldData.json';
import reportDataNoFieldData from '../../mocks/pageExperienceCheck/reportDataNoFieldData.json';
import apiResponseOriginFieldData from '../../mocks/pageExperienceCheck/apiResponseOriginFieldData.json';
import reportDataOriginFieldData from '../../mocks/pageExperienceCheck/reportDataOriginFieldData.json';
import reportDescriptions from '../../mocks/pageExperienceCheck/reportDescriptions.json';

import pixiConfig from '../../config.js';

let pageExperienceCheck;
let fetch;

beforeEach(() => {
  fetchMock.reset();
  fetch = fetchMock.sandbox();
  pageExperienceCheck = new PageExperienceCheck(fetch);
});

describe('Page experience check', () => {
  it('creates report data for url with no errors', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetch.mock(`begin:${apiEndpoint}`, apiResponseNoErrors);

    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataNoErrors);
    expect(report.descriptions).toEqual(reportDescriptions);
  });

  it('creates report data for url with errors', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetch.mock(`begin:${apiEndpoint}`, apiResponseErrors);

    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataErrors);
    expect(report.descriptions).toEqual(reportDescriptions);
  });

  it('creates report data for url with no field data', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetch.mock(`begin:${apiEndpoint}`, apiResponseNoFieldData);

    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataNoFieldData);
    expect(report.descriptions).toEqual(reportDescriptions);
  });

  it('creates report data for url with no loadingExperience', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetch.mock(`begin:${apiEndpoint}`, apiResponseNoLoadingExperience);

    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataNoLoadingExperience);
    expect(report.descriptions).toEqual(reportDescriptions);
  });

  it('creates report data for url with origin field data', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetch.mock(`begin:${apiEndpoint}`, apiResponseOriginFieldData);

    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataOriginFieldData);
    expect(report.descriptions).toEqual(reportDescriptions);
  });
});
