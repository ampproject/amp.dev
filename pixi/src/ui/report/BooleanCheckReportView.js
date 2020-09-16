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

import i18n from '../I18n';

export default class BooleanCheckReportView {
  constructor(doc, id) {
    this.container = doc.getElementById(id);
    this.label = this.container.querySelector('label');
    this.initialLabelContent = this.label.innerHTML;
  }

  render(report) {
    if (report === true) {
      this.label.textContent = i18n.getText('status.passed');
      this.container.classList.add('passed');
    } else if (report === false) {
      this.label.textContent = i18n.getText('status.failed');
      this.container.classList.add('failed');
    } else {
      this.label.textContent = i18n.getText('status.error');
      this.container.classList.add('error');
    }

    this.toggleLoading(false);
  }

  toggleLoading(force) {
    this.container.classList.toggle('loading', force);
    if (force) {
      this.container.classList.remove('passed', 'failed', 'error');
      this.label.innerHTML = this.initialLabelContent;
    }
  }
}
