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

import PageExperienceCheck from '../checks/PageExperienceCheck.js';
import CoreWebVitalsReport from './report/CoreWebVitalsReport.js';

// Match legal URLs. E.g. https://amp.dev/
const URL_VALIDATION_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

export default class PageExperience {
  constructor() {
    this.input = document.getElementById('input-field');
    this.submit = document.getElementById('input-submit');
    this.submit.addEventListener('click', this.onSubmitUrl.bind(this));

    this.reports = {};
  }

  async onSubmitUrl() {
    this.toggleLoading(true);

    const value = this.input.value;
    const url =
      value.startsWith('http://') || value.startsWith('https://')
        ? value
        : `http://${value}`;

    if (url.match(URL_VALIDATION_REGEX)) {
      const check = new PageExperienceCheck(url);
      const report = await check.run();

      const fieldData = report.CoreWebVitals.fieldData;

      this.reports['lcp'] = this.reports['lcp'] || new CoreWebVitalsReport(document, fieldData.lcp.id);
      this.reports.lcp.render(fieldData.lcp);

      this.reports['fid'] = this.reports['fid'] ||  new CoreWebVitalsReport(document, fieldData.fid.id);
      this.reports.fid.render(fieldData.fid);

      this.reports['cls'] = this.reports['cls'] ||  new CoreWebVitalsReport(document, fieldData.cls.id);
      this.reports.cls.render(fieldData.cls);

      // TODO: Initialize lab data reports
    } else {
      this.onError('Error: Please enter a valid URL');
    }
  }

  toggleLoading(force) {
    this.submit.classList.toggle('loading', force);
  }
}

new PageExperience();
