// Copyright 2020 The AMPHTML Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const FetchError = require('../../../platform/lib/utils/fetchError.js');

const API_ENDPOINT = API_ENDPOINT_LINTER;

const directMapping = {
  isvalid: 'isValid',
  runtimeispreloaded: 'runtimeIsPreloaded',
  blockingextensionspreloaded: 'blockingExtensionsPreloaded',
  fontsarepreloaded: 'fontsArePreloaded',
  fastgooglefontsdisplay: 'fastGoogleFontsDisplay',
  googlefontpreconnect: 'googleFontPreconnect',
  istransformedamp: 'isTransformedAmp',
  boilerplateisremoved: 'boilerplateIsRemoved',
  heroimageisdefined: 'heroImageIsDefined',
  viewportdisablestapdelay: 'viewportDisablesTapDelay',
  noiconfontisused: 'noIconFontIsUsed',
};

export default class AmpLinterCheck {
  constructor() {
    this.apiUrl = new URL(API_ENDPOINT);
  }

  static getCheckCount() {
    return 15;
  }

  async run(pageUrl) {
    this.apiUrl.searchParams.set('url', pageUrl);

    try {
      const apiResult = await this.fetchJson();
      return this.parseApiResult(apiResult);
    } catch (e) {
      return this.createError(e);
    }
  }

  parseApiResult(apiResult) {
    if (apiResult.status !== 'ok') {
      if (apiResult.errorId == FetchError.UNSUPPORTED_CONTENT_TYPE) {
        return {data: {hasUnsupportedContentType: true}};
      }

      return {data: {isLoaded: false}};
    }

    return this.createReportData(apiResult);
  }

  createError(error) {
    return {error, data: {}};
  }

  createReportData(apiResult) {
    const linterStatus = !apiResult.data
      ? {}
      : Object.entries(apiResult.data).reduce((mappedData, [key, checks]) => {
          // most checks are mapped 1:1 to the result
          const resultKey = directMapping[key];
          if (resultKey) {
            if (Array.isArray(checks)) {
              mappedData[resultKey] =
                checks.length === 1 && checks[0].status === 'PASS';
            } else {
              mappedData[resultKey] = checks.status === 'PASS';
            }
          }
          return mappedData;
        }, {});

    if (linterStatus.boilerplateIsRemoved === false) {
      if (apiResult.data.boilerplateisremoved.status === 'WARN') {
        linterStatus.updateOptimizerForBoilerplateRemoval = true;
      }
    }

    const components = apiResult.components || {};

    return {
      data: {
        isLoaded: true,
        isAmp: apiResult.isAmp,
        isOriginUrl: !apiResult.isCacheUrl,
        usesHttps:
          apiResult.url != undefined && apiResult.url.startsWith('https:'),
        components: Object.keys(components).join(', '),
        noRenderBlockingExtension: !(
          components['amp-experiment'] || components['amp-dynamic-css-classes']
        ),
        noDynamicLayoutExtensions: !(
          components['amp-access'] ||
          components['amp-user-notification'] ||
          components['amp-script']
        ),
        ...linterStatus,
      },
    };
  }

  async fetchJson() {
    const response = await fetch(this.apiUrl.href);
    return response.json();
  }
}
