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

const API_ENDPOINT = API_ENDPOINT_LINTER;

export default class AmpLinterCheck {
  constructor() {
    this.apiUrl = new URL(API_ENDPOINT);
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
    if (apiResult.status != 'ok') {
      return this.createError(new Error(apiResult.message));
    }

    return this.createReportData(apiResult);
  }

  createError(error) {
    return {error, data: {}};
  }

  createReportData(apiResult) {
    return {
      data: {
        usesHttps:
          apiResult.url != undefined && apiResult.url.startsWith('https:'),
      },
    };
  }

  async fetchJson() {
    try {
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error(
          `AmpLinterCheck failed: response failed with status ${response.status}`
        );
      }
      return response.json();
    } catch (e) {
      throw new Error('AmpLinterCheck failed:', e);
    }
  }
}
