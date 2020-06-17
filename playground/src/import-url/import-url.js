// Copyright 2018 The AMPHTML Authors
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

require('./import-url.scss');

import events from '../events/events.js';
const fetch = require('node-fetch');
import * as Button from '../button/button.js';
import FlyIn from '../fly-in/base.js';

export const EVENT_NEW_URL_INPUT =
  'event-new-url-input';


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
      <p class="experimental-view-intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Learn more about experimental features.</p>
      <form id="url-bar" class="import-url-bar">
        <input id="url-bar-input" class="import-url-bar-input" placeholder="Your URL" type="url" required pattern="https?://.+" name="input">
        <input id="url-bar-submit" class="import-url-bar-submit" type="submit" value="Import"></input>
      </form>`;
    this.upadateContent(content);

    const urlBar = document.getElementById('url-bar');
    const urlBarInput = document.getElementById('url-bar-input');
    const urlBarSubmit = document.getElementById('url-bar-submit');

    urlBar.addEventListener('submit', (e) => {
      e.preventDefault();
      this.updateEditor(urlBarSubmit, urlBarInput.value);
      urlBarSubmit.classList.add('loading');
      urlBarSubmit.value = '. . .';
    });
  }

  async updateEditor(urlBarSubmit, url) {
    const html = await this.doFetch(url);
    urlBarSubmit.classList.remove('loading');
    urlBarSubmit.value = 'Import';
    events.publish(EVENT_NEW_URL_INPUT, html);
    this.toggle();
  }

  async doFetch(url) {
    const response = await fetch(url, {
      compress: true,
      headers: {
        'Accept': 'text/html',
        'x-requested-by': 'playground',
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MTC19V) ' +
          'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.81 Mobile ' +
          'Safari/537.36 (compatible; amp.dev/playground)',
        'Referer': 'https://amp.dev/playground',
      },
    });
    return response.text();
  }
}
