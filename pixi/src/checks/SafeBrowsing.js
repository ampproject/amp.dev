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

const API_ENDPOINT =
  'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export default class SafeBrowsing {
  constructor() {
    this.apiUrl = new URL(API_ENDPOINT);
  }

  async run(pageUrl) {
    this.apiUrl.searchParams.set('url', pageUrl);

    try {
      const apiResult = await this.fetchJson();
      return this.createReportData(apiResult);
    } catch (e) {
      // TODO: Create an Error Report
      throw new Error('SafeBrowsing failed fetching:', e);
    }
  }

  async fetchJson() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`SafeBrowsing failed fetching from: ${this.apiUrl}`);
      }
      const result = await response.json();
      return result;
    } catch (e) {
      throw new Error('SafeBrowsing failed:', e);
    }
  }
}
