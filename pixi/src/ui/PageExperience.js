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

export default class PageExperience {
  constructor() {
    this.input = document.getElementById('input-field');
    this.submit = document.getElementById('input-submit');
    this.submit.addEventListener('click', this.onSubmitUrl.bind(this));

    this.reportViews = {};
  }

  isValidURL(inputUrl) {
    try {
      const url = new URL(inputUrl);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  async onSubmitUrl() {
    const inputUrl = this.input.value;

    if (this.isValidURL(inputUrl)) {
      this.toggleLoading(true);

      const check = new PageExperienceCheck();
      const report = await check.run(inputUrl);
      const fieldData = report.coreWebVitals.fieldData;

      this.reportViews['lcp'] =
        this.reportViews['lcp'] ||
        new CoreWebVitalsReport(document, fieldData.lcp.id);
      this.reportViews.lcp.render(fieldData.lcp);

      this.reportViews['fid'] =
        this.reportViews['fid'] ||
        new CoreWebVitalsReport(document, fieldData.fid.id);
      this.reportViews.fid.render(fieldData.fid);

      this.reportViews['cls'] =
        this.reportViews['cls'] ||
        new CoreWebVitalsReport(document, fieldData.cls.id);
      this.reportViews.cls.render(fieldData.cls);

      // TODO: Initialize lab data reports
    } else {
      throw new Error('Please enter a valid URL');
      // TODO: Show error message in UI
    }

    this.toggleLoading(false);
  }

  toggleLoading(force) {
    this.submit.classList.toggle('loading', force);
    for (const report of Object.keys(this.reportViews)) {
      this.reportViews[report].toggleLoading(force);
    }
  }
}

new PageExperience();
