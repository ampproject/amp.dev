/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class AmpUrlConverter {
  constructor(root, createCacheUrl) {
    this.inputView = root.getElementById('input');
    this.resultView = root.getElementById('result');
    this.createCacheUrl = createCacheUrl;
    root
      .getElementById('input')
      .addEventListener('input', this.onChange.bind(this));
  }

  setInput(urlString) {
    this.inputView.value = urlString;
    this.convert(urlString);
  }

  convert(urlString) {
    urlString = urlString.trim();
    if (!urlString) {
      this.showError('Empty input');
      return;
    }
    this.createCacheUrl('cdn.ampproject.org', urlString)
      .then(this.showResult.bind(this))
      .catch(this.showError.bind(this));
  }

  clearResultView() {
    while (this.resultView.firstChild) {
      this.resultView.removeChild(this.resultView.firstChild);
    }
  }

  showError() {
    this.clearResultView();
    this.resultView.className = 'error';
    this.resultView.textContent = 'invalid URL';
  }

  showResult(cacheUrl) {
    this.clearResultView();
    const result = window.document.createElement('a');
    result.setAttribute('href', cacheUrl);
    result.setAttribute('target', '_blank');
    result.textContent = cacheUrl;
    this.resultView.className = '';
    this.resultView.appendChild(result);
  }

  onChange() {
    window.requestAnimationFrame(() => this.convert(this.inputView.value));
  }
}

function getParameterByName(name, defaultValue) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return defaultValue;
  }
  if (!results[2]) {
    return defaultValue;
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const createCacheUrl = window.AmpToolboxCacheUrl.createCacheUrl;

const converter = new AmpUrlConverter(document, createCacheUrl);
const initialUrl = getParameterByName(
  'url',
  'https://www.example.com/amp?param=1'
);

converter.setInput(initialUrl);
