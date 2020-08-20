/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

import LinterCheck from './LinterCheck.js';
import dummyApiResponse from '../../mocks/linterCheck/apiResponse.json';
import expectedReportData from '../../mocks/linterCheck/reportData.json';

import pixiConfig from '../../config.js';

beforeEach(() => {
  fetchMock.reset();
});

describe('Linter check', () => {
  const apiEndpoint = pixiConfig['development'].API_ENDPOINT_LINTER;
  const linterCheck = new LinterCheck();

  it('', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, dummyApiResponse);

    const report = await linterCheck.run('http://example.com');
    expect(report.data).toBe(expectedReportData);
  });
});
