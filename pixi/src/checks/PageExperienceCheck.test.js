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
// eslint-disable-next-line max-len
import reportDataNoCacheFieldData from '../../mocks/pageExperienceCheck/reportDataNoCacheFieldData.json';

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
  });

  it('creates report data for url with errors', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponseErrors);

    const pageExperienceCheck = new PageExperienceCheck();
    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataErrors);
  });

  it('creates report data for url with no field data', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponseNoFieldData);

    const pageExperienceCheck = new PageExperienceCheck();
    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataNoFieldData);
  });

  it('creates report data for url with no field data for cache', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetchMock
      .mock(
        `begin:${apiEndpoint}?key=&url=http%3A%2F%2Fexample.com`,
        apiResponseNoErrors
      )
      .mock(`begin:${apiEndpoint}`, apiResponseNoFieldData);

    const pageExperienceCheck = new PageExperienceCheck();
    const report = await pageExperienceCheck.run('http://example.com');
    expect(report.error).toBeUndefined();
    expect(report.data).toEqual(reportDataNoCacheFieldData);
  });
});
