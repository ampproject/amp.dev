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

import {UNIT_DEC, UNIT_SEC, UNIT_MS} from './constants.js';
import BaseCheck from './BaseCheck.js';
import PrimaryCheckUI from './PrimaryCheckUI.js';

// const API_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=';
// const API_KEY = '&key=AIzaSyCKKBvhpC73FqDcO-T7_4Yqdx4nQXh2sQY';

const CHECKS = [
  {
    id: 'LARGEST_CONTENTFUL_PAINT_MS',
    unit: UNIT_SEC
  },
  {
    id: 'FIRST_INPUT_DELAY_MS',
    unit: UNIT_MS
  },
  {
    id: 'CUMULATIVE_LAYOUT_SHIFT_SCORE',
    unit: UNIT_DEC
  }
];

export default class CheckPageExperience extends BaseCheck {
  constructor(id) {
    super(id);

    this.checkUIs = {};
    for (const check of CHECKS) {
      this.checkUIs[check.id] = new PrimaryCheckUI(check);
    }
  }

  runCheck() {
    // const inputValue = this.input.value;
    // const apiEndpoint = `${API_ENDPOINT}${inputValue}${API_KEY}`
    const dummyApiEndpoint = `http://localhost:8080/page-experience/api/page-experience-dummy`;

    this.fetchApi(dummyApiEndpoint);
    console.log('Start running Page Experience Check', dummyApiEndpoint);
  }

  onSuccess(response) {
    this.toggleLoading(false);
    this.renderResult(response.loadingExperience.metrics);
  }

  renderResult(result) {
    for (const check of Object.keys(result)) {
      if (this.checkUIs[check]) {
        this.checkUIs[check].render(result[check]);
      }
    }
  }
}
