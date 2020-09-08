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

/* eslint-disable max-len */
const URL_VALIDATION_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
const AMP_PROJECT_CDN_URL = 'cdn.ampproject.org';

export default class InputBar {
  constructor(doc, callback) {
    this.container = doc.getElementById('input-bar');
    this.field = this.container.querySelector('#input-field');
    this.submit = this.container.querySelector('#input-submit');
    this.label = this.container.querySelector('#input-label');

    this.submit.addEventListener('click', callback);
    this.field.addEventListener('keyup', (e) => {
      if (e.keyCode == 13 && !this.submit.classList.contains('loading')) {
        callback();
      }

      this.toggleValid(this.isValidUrl(this.field.value));
    });
  }

  isValidUrl(pageUrl) {
    return pageUrl.match(URL_VALIDATION_REGEX) ? true : false;
  }

  async getPageUrl() {
    let value = this.field.value;

    if (!value) {
      try {
        // Can be removed once https://github.com/ampproject/worker-dom/issues/912
        value = await AMP.getState('pixi.pageUrl');
      } catch (e) {
        console.error('Could not get URL from amp state', e);
      }
    }

    const pageUrl =
      value.startsWith('http://') || value.startsWith('https://')
        ? value
        : `http://${value}`;

    if (pageUrl.includes(AMP_PROJECT_CDN_URL)) {
      return;
    }

    if (!this.isValidUrl(pageUrl)) {
      return;
    }

    this.toggleError(false, '&nbsp;');
    return pageUrl;
  }

  toggleValid(force) {
    this.submit.disabled = !force;
  }

  toggleError(force, error) {
    this.container.classList.toggle('error', force);
    this.label.textContent = error;
  }

  toggleLoading(force) {
    this.submit.classList.toggle('loading', force);
  }
}
