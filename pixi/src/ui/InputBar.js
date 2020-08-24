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

export default class InputBar {
  constructor(doc, callback) {
    this.container = doc.getElementById('input-bar');
    this.field = this.container.querySelector('#input-field');
    this.submit = this.container.querySelector('#input-submit');
    this.label = this.container.querySelector('label');

    this.submit.addEventListener('click', callback);
    this.field.addEventListener('keydown', (e) => {
      if (e.keyCode == 13) {
        callback();
      }
    });
  }

  async isValid() {
    const pageUrl = await this.value;
    try {
      const url = new URL(pageUrl);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  toggleError(force, error) {
    this.container.classList.toggle('error', force);
    this.label.textContent = error;
  }

  toggleLoading(force) {
    this.container.classList.toggle('loading', force);
  }

  get value() {
    if (this.field.value) {
      return Promise.resolve(this.field.value);
    }

    // Can be removed once https://github.com/ampproject/worker-dom/issues/912
    return AMP.getState('pixi.pageUrl');
  }
}
