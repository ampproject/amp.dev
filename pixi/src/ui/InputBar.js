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

import i18n from './I18n.js';

/* eslint-disable max-len */
const URL_VALIDATION_REGEX = /^(?:https?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w._~:/?#\[\]@!$%&'()*+,;=-]+$/gm;

export default class InputBar {
  constructor(doc, callback) {
    this.container = doc.getElementById('input-bar');
    this.field = this.container.querySelector('#input-field');
    this.submit = this.container.querySelector('#input-submit');
    this.label = this.container.querySelector('#input-label');

    this.submit.addEventListener('click', callback);
    this.field.addEventListener('input', this.validate.bind(this));
    this.field.addEventListener('keyup', (e) => {
      const valid = this.validate();
      if (
        valid &&
        e.keyCode === 13 &&
        !this.submit.classList.contains('loading')
      ) {
        callback();
      }
    });
  }

  isValidUrl(pageUrl) {
    return pageUrl.match(URL_VALIDATION_REGEX) ? true : false;
  }

  validate() {
    const valid = this.isValidUrl(this.field.value);
    this.submit.disabled = !valid;

    if (!valid) {
      this.toggleError(true, i18n.getText('inputBar.fieldError'));
    } else {
      this.toggleError(false, ' ');
    }

    return valid;
  }

  async getPageUrl() {
    let value = this.field.value;

    if (!value) {
      try {
        // Can be removed once
        // https://github.com/ampproject/worker-dom/issues/912
        // is fixed and released
        value = await AMP.getState('pixi.pageUrl');
      } catch (e) {
        console.error('Could not get URL from AMP state', e);
      }
    }

    const pageUrl =
      value.startsWith('http://') || value.startsWith('https://')
        ? value
        : `http://${value}`;

    if (!this.isValidUrl(pageUrl)) {
      return;
    }

    return pageUrl;
  }

  toggleError(force, error) {
    this.container.classList.toggle('error', force);
    this.label.textContent = error;
  }

  toggleLoading(force) {
    this.submit.classList.toggle('loading', force);
  }
}
