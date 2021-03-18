/**
 * @jest-environment jsdom
 */

import fetchMock from 'fetch-mock';

import AmpLinterCheck from './AmpLinterCheck.js';
import {
  apiResponsePassAll,
  apiResponseFailAll,
  apiResponseInfoBoilerplate,
  apiResponseNoAmp,
  apiResponseError,
} from '../../mocks/ampLinterCheck/apiResponse.js';

import pixiConfig from '../../config.js';

beforeEach(() => {
  fetchMock.reset();
  global.AMP = {
    getState: async (id) => {
      if (id === 'pixiCanary') {
        return true;
      }
      return '';
    },
  };
});

describe('Linter check', () => {
  const apiEndpoint = pixiConfig.development.API_ENDPOINT_LINTER;
  const linterCheck = new AmpLinterCheck();

  it('returns object with all checks passed', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponsePassAll);

    const report = await linterCheck.run('http://example.com');
    expect(report.data.isLoaded).toBe(true);
    expect(report.data.isAmp).toBe(true);
    expect(report.data.isOriginUrl).toBe(true);
    expect(report.data.usesHttps).toBe(true);
    expect(report.data.isValid).toBe(true);
    expect(report.data.runtimeIsPreloaded).toBe(true);
    expect(report.data.blockingExtensionsPreloaded).toBe(true);
    expect(report.data.googleFontPreconnect).toBe(true);
    expect(report.data.isTransformedAmp).toBe(true);
    expect(report.data.boilerplateIsRemoved).toBe(true);
    expect(report.data.updateOptimizerForBoilerplateRemoval).not.toBe(true);
    expect(report.data.noRenderBlockingExtension).toBe(true);
    expect(report.data.noDynamicLayoutExtensions).toBe(true);
    expect(report.data.viewportDisablesTapDelay).toBe(true);
  });

  it('returns object with all checks failed', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponseFailAll);

    const report = await linterCheck.run(
      'http://www-test.cdn.ampproject.org/c/s/www.test/'
    );
    expect(report.data.isLoaded).toBe(true);
    expect(report.data.isAmp).toBe(true);
    expect(report.data.isOriginUrl).toBe(false);
    expect(report.data.usesHttps).toBe(false);
    expect(report.data.isValid).toBe(false);
    expect(report.data.runtimeIsPreloaded).toBe(false);
    expect(report.data.blockingExtensionsPreloaded).toBe(false);
    expect(report.data.isTransformedAmp).toBe(false);
    expect(report.data.boilerplateIsRemoved).toBe(false);
    expect(report.data.updateOptimizerForBoilerplateRemoval).toBe(true);
    expect(report.data.noRenderBlockingExtension).toBe(false);
    expect(report.data.noDynamicLayoutExtensions).toBe(false);
    expect(report.data.viewportDisablesTapDelay).toBe(false);
  });

  it('returns object with boilerplateIsRemoved=false, but extra optimizer info', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponseInfoBoilerplate);

    const report = await linterCheck.run('http://example.com');
    expect(report.data.boilerplateIsRemoved).toBe(false);
    expect(report.data.updateOptimizerForBoilerplateRemoval).not.toBe(true);
  });

  it('returns object with only the isAmp and isLoaded flag', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponseNoAmp);

    const report = await linterCheck.run('http://example.com');
    expect(report.data.isLoaded).toBe(true);
    expect(report.data.isAmp).toBe(false);
    expect(report.data.isValid).toBeUndefined();
  });

  it('returns object with only the isLoaded flag', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, apiResponseError);

    const report = await linterCheck.run('http://example.com');
    expect(report.data.isLoaded).toBe(false);
    expect(report.data.isAmp).toBeUndefined();
    expect(report.data.isValid).toBeUndefined();
  });

  it('throws for invalid API response', async () => {
    fetchMock.mock(`begin:${apiEndpoint}`, 500);

    const report = await linterCheck.run('http://example.com');
    expect(report.error).toBeDefined();
  });
});
