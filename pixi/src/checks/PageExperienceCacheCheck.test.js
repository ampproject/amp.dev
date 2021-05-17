/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

import PageExperienceCacheCheck from './PageExperienceCacheCheck.js';
import apiResponseNoErrors from '../../mocks/pageExperienceCheck/apiResponse.json';
import reportDataNoErrors from '../../mocks/pageExperienceCheck/reportData.json';
import apiResponseNoFieldData from '../../mocks/pageExperienceCheck/apiResponseNoFieldData.json';
import reportDataNoFieldData from '../../mocks/pageExperienceCheck/reportDataNoFieldData.json';

import pixiConfig from '../../config.js';

let pageExperienceCheck;
let fetch;

beforeEach(() => {
  fetch = fetchMock.sandbox();
  pageExperienceCheck = new PageExperienceCacheCheck(fetch);
});

describe('Page experience cache check', () => {
  it('creates report data for url with no errors', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetch.mock(`begin:${apiEndpoint}`, apiResponseNoErrors);

    const report = await pageExperienceCheck.run(
      'http://example.com',
      Promise.resolve({data: reportDataNoErrors})
    );
    expect(report.error).toBeUndefined();
    expect(report.data).toMatchObject(reportDataNoErrors);
    const {fieldData, labData} = report.data.pageExperience;
    expect(fieldData.lcp.data.improvement).toEqual(0);
    expect(fieldData.cls.data.improvement).toEqual(0);
    expect(fieldData.fid.data.improvement).toEqual(0);
    expect(labData.lcp.data.improvement).toEqual(0);
    expect(labData.cls.data.improvement).toEqual(0);
    expect(labData.tbt.data.improvement).toEqual(0);
  });

  it('creates report data for url with no field data', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetch.mock(`begin:${apiEndpoint}`, apiResponseNoFieldData);

    const report = await pageExperienceCheck.run(
      'http://example.com',
      Promise.resolve({data: reportDataNoFieldData})
    );
    expect(report.error).toBeUndefined();
    expect(report.data).toMatchObject(reportDataNoFieldData);
    const {fieldData, labData} = report.data.pageExperience;
    expect(fieldData).toBeFalsy();
    expect(labData.lcp.data.improvement).toEqual(0);
    expect(labData.cls.data.improvement).toEqual(0);
    expect(labData.tbt.data.improvement).toEqual(0);
  });

  it('creates report data for url with no field data for cache', async () => {
    const apiEndpoint =
      pixiConfig['development'].API_ENDPOINT_PAGE_SPEED_INSIGHTS;
    fetch.mock(`begin:${apiEndpoint}`, apiResponseNoFieldData);

    const report = await pageExperienceCheck.run(
      'http://example.com',
      Promise.resolve({data: reportDataNoErrors})
    );
    expect(report.error).toBeUndefined();
    expect(report.data).toMatchObject(reportDataNoFieldData);
    const {fieldData, labData} = report.data.pageExperience;
    expect(fieldData).toBeFalsy();
    expect(labData.lcp.data.improvement).toEqual(376.5174063968011);
    expect(labData.tbt.data.improvement).toEqual(227.99999999999977);
    expect(labData.cls.data.improvement).toEqual(0);
  });
});
