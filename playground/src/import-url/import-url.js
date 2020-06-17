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
const fetch = require('node-fetch');


// import events from '../events/events.js';
import * as Button from '../button/button.js';
import FlyIn from '../fly-in/base.js';

export function createImportURLView(target, trigger) {
  return new ImportURL(target, trigger);
}

const DESKTOP_WIDTH = 1024;

class ImportURL extends FlyIn {
  constructor(target, trigger) {
    super(target);

    this.target = target;
    this.trigger = Button.from(trigger, this.toggle.bind(this));

    const content = document.createElement('div');
    content.className = 'import-url';
    content.innerHTML = `
      <p class="experimental-view-intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Learn more about experimental features.</p>
      <form id="url-bar" class="url-bar">
        <input id="url-bar-input" class="url-bar-input" placeholder="Your URL" type="url" required pattern="https?://.+" name="input">
        <input id="url-bar-submit" class="url-bar-submit" type="submit" value="Import"></input>
      </form>`;
    this.upadateContent(content);


    document.getElementById('url-bar').addEventListener('submit', (e) => {
      e.preventDefault();
      const url = document.getElementById('url-bar-input').value;
      this.updateEditor(url);
    });
  }

  async updateEditor(url) {
    const html = await  this.doFetch(url);
    console.log(html);
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
