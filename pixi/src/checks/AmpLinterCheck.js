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
const PASSING_STATUS = 'PASS';

export default class AmpLinterCheck {
  constructor() {
    this.apiUrl = new URL(API_ENDPOINT);
  }

  async run(pageUrl) {
    this.apiUrl.searchParams.set('url', pageUrl);

    try {
      const apiResult = await this.fetchJson();
      return this.createReportData(apiResult);
    } catch (e) {
      return this.createError(e);
    }
  }

  parseRecommendations(data) {
    const values = Object.entries(data).map(([key, value]) => {
      return Array.isArray(value)
        ? value.map((x) => ({id: key, ...x}))
        : {id: key, ...value};
    });
    const recommendations = values
      .flat()
      .filter((finding) => finding.status !== PASSING_STATUS)
      .map((finding) => ({
        id: finding.id,
        title: finding.title,
        description: finding.message || '',
        url: finding.url,
      }));
    return recommendations;
  }

  createError(error) {
    return {error};
  }

  createReportData(apiResult) {
    if (apiResult.status != 'ok') {
      return this.createError(new Error(apiResult.message));
    }

    return {
      data: {
        components: apiResult.components,
        recommendations: this.parseRecommendations(apiResult.data || {}),
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
