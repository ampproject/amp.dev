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

import './import-url.scss';

import events from '../events/events.js';
import * as Button from '../button/button.js';
import * as Document from '../document/document.js';
import FlyIn from '../fly-in/base.js';

export const EVENT_REQUEST_URL_CONTENT = 'event-request-url-content';

export function createImportURLView(target, trigger) {
  return new ImportURL(target, trigger);
}

class ImportURL extends FlyIn {
  constructor(target, trigger) {
    super(target);

    this.target = target;
    this.trigger = Button.from(trigger, this.toggle.bind(this));

    const content = document.createElement('div');
    content.className = 'import-url';
    content.innerHTML = `
      <p class="experimental-view-intro">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris. Learn more about experimental features.
      </p>
      <div class="import-url-bar">
        <input id="url-bar-input"
            class="import-url-bar-input"
            type="url"
            name=""
            value=""
            placeholder="Your URL">
        <button id="url-bar-submit"
            class="import-url-bar-submit"
            type=""
            name="button">
          Import
        </button>
      </div>`;

    this.upadateContent(content);

    this.urlBarInput = document.getElementById('url-bar-input');
    this.urlBarSubmit = document.getElementById('url-bar-submit');

    this.urlBarSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      this.importURL(this.urlBarInput.value);
    });

    events.subscribe(Document.EVENT_NEW_URL_CONTENT, (content) => {
      window.requestIdleCallback(() => {
        this.importSuccess(content);
      });
    });
  }

  importURL(url) {
    events.publish(EVENT_REQUEST_URL_CONTENT, url);
    this.urlBarSubmit.classList.add('loading');
    this.urlBarSubmit.innerText = '';
    window.location.hash = `url=${url}`;
  }

  importSuccess(content) {
    console.log('onSuccess');
    this.urlBarSubmit.classList.remove('loading');
    this.urlBarSubmit.innerText = 'Import';
    this.toggle();
  }

  importError() {

  }
}
