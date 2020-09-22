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

import ampToolboxCacheUrl from '@ampproject/toolbox-cache-url';
import PageExperienceCheck from './PageExperienceCheck.js';

const AMP_PROJECT_CDN_URL = 'cdn.ampproject.org';

export default class PageExperienceCacheCheck {
  constructor() {
    this.pageExperienceCheck = new PageExperienceCheck();
  }

  static getCheckCount() {
    return PageExperienceCheck.getCheckCount();
  }

  async run(originUrl, originPageExperiencePromise) {
    const cacheUrl = await ampToolboxCacheUrl.createCacheUrl(
      AMP_PROJECT_CDN_URL,
      originUrl
    );

    const cacheResult = await this.pageExperienceCheck.run(cacheUrl);
    const originResult = await originPageExperiencePromise;
    if (cacheResult.data && originResult.data) {
      const cacheFieldData = cacheResult.data.pageExperience.fieldData;
      const originFieldData = originResult.data.pageExperience.fieldData;
      const cacheLabData = cacheResult.data.pageExperience.labData;
      const originLabData = originResult.data.pageExperience.labData;
      if (cacheFieldData && originFieldData) {
        this.addImprovement(cacheFieldData, originFieldData, 'lcp');
        this.addImprovement(cacheFieldData, originFieldData, 'cls');
        this.addImprovement(cacheFieldData, originFieldData, 'fid');
      }
      if (cacheLabData && originLabData) {
        this.addImprovement(cacheLabData, originLabData, 'lcp');
        this.addImprovement(cacheLabData, originLabData, 'cls');
        this.addImprovement(cacheLabData, originLabData, 'tbt');
      }
    }
    return cacheResult;
  }

  addImprovement(cacheMetric, originMetric, key) {
    const cacheData = cacheMetric[key].data;
    const originData = originMetric[key].data;
    cacheData.improvement = Math.max(
      0,
      originData.numericValue - cacheData.numericValue
    );
  }
}
