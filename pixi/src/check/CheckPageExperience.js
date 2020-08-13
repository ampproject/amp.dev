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

import BaseCheck from './BaseCheck.js';

// const API_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=';
// const API_KEY = '&key=AIzaSyCKKBvhpC73FqDcO-T7_4Yqdx4nQXh2sQY';

export default class CheckPageExperience extends BaseCheck {
  constructor(id) {
    super(id);

    this.lcp = document.getElementById('check-px-lcp');
    this.fid = document.getElementById('check-px-fid');
    this.cls = document.getElementById('check-px-cls');

    this.lcpLabel = this.lcp.querySelector('label');
    this.fidLabel = this.fid.querySelector('label');
    this.clsLabel = this.cls.querySelector('label');

    this.lcpIndicator = this.lcp.querySelector('aside');
    this.fidIndicator = this.fid.querySelector('aside');
    this.clsIndicator = this.cls.querySelector('aside');
  }

  runCheck() {
    const apiEndpoint = `http://localhost:8080/pixi/api/page-experience-dummy`;
    // const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${this.input.value}&key=AIzaSyCKKBvhpC73FqDcO-T7_4Yqdx4nQXh2sQY`;
    this.fetchApi(apiEndpoint);
    console.log('Start running Page Experience Check', apiEndpoint);
  }

  onSuccess(response) {
    console.log('onSuccess');
    this.toggleLoading(true);
    const result = this.parseResult(response);
    this.renderResult(result);
  }

  parseResult(response) {
    const metrics = response.loadingExperience.metrics;
    return {
      lcp: metrics.LARGEST_CONTENTFUL_PAINT_MS,
      fid: metrics.FIRST_INPUT_DELAY_MS,
      cls: metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE,
    };
  }

  renderResult(result) {
    this.lcpLabel.textContent = `${result.lcp.category}`;
    this.fidLabel.textContent = `${result.fid.category}`;
    this.clsLabel.textContent = `${result.cls.category}`;
    this.lcpLabel.classList.add(result.lcp.category.toLowerCase());
    this.fidLabel.classList.add(result.fid.category.toLowerCase());
    this.clsLabel.classList.add(result.cls.category.toLowerCase());

    this.lcpIndicator.textContent = `${result.lcp.percentile / 1000} sec`;
    this.fidIndicator.textContent = `${result.fid.percentile} ms`;
    this.clsIndicator.textContent = `${result.cls.percentile / 100}`;

    const lcpIndicatorX =
      result.lcp.percentile / result.lcp.distributions[2].min;
    const fidIndicatorX =
      result.fid.percentile / result.fid.distributions[2].min;
    const clsIndicatorX =
      result.cls.percentile / result.cls.distributions[2].min;

    this.lcpIndicator.style.transform = `translate3d(${
      lcpIndicatorX * 100
    }%, 0, 0);`;
    this.fidIndicator.style.transform = `translate3d(${
      fidIndicatorX * 100
    }%, 0, 0);`;
    this.clsIndicator.style.transform = `translate3d(${
      clsIndicatorX * 100
    }%, 0, 0);`;
  }
}
