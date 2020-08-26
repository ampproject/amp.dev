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

const API_ENDPOINT = API_ENDPOINT_MOBILE_FRIENDLINESS;

const API_URL = `${API_ENDPOINT}?key=${AMP_DEV_PIXI_APIS_KEY}`;

export default class MobileFriendlinessCheck {
  async run(pageUrl) {
    try {
      const apiResult = await this.fetchJson(pageUrl);
      return this.createReportData(null, apiResult);
    } catch (e) {
      return this.createReportData(e);
    }
  }

  createReportData(error, apiResult) {
    if (error || apiResult.testStatus.status !== 'COMPLETE') {
      return {
        error,
        data: {
          result: false,
        },
      };
    }
    return {
      error,
      data: {
        mobileFriendliness: apiResult.mobileFriendliness == 'MOBILE_FRIENDLY',
      },
    };
  }

  async fetchJson(pageUrl) {
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          url: pageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `MobileFriendlinessCheck failed: response failed with status ${response.status}`
        );
      }
      const result = await response.json();
      return result;
    } catch (e) {
      throw new Error('MobileFriendlinessCheck failed:', e);
    }
  }
}
