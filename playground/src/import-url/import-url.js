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
import template from '../import-url/import-url.hbs';

import events from '../events/events.js';
import * as Button from '../button/button.js';
import * as Document from '../document/document.js';
import FlyIn from '../fly-in/base.js';
import * as Editor from '../editor/editor.js';

export const EVENT_REQUEST_URL_CONTENT = 'event-request-url-content';

/* eslint-disable max-len */
const URL_VALIDATION_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

export function createImportURLView(target, trigger) {
  return new ImportURL(target, trigger);
}

class ImportURL extends FlyIn {
  constructor(target, trigger) {
    super(target);

    this.target = target;
    this.trigger = Button.from(trigger, this.toggle.bind(this));

    this.content.insertAdjacentHTML('beforeend', template());

    this.urlBarLabel = target.querySelector('#url-bar-label');
    this.urlBarInput = target.querySelector('#url-bar-input');
    this.urlBarSubmit = target.querySelector('#url-bar-submit');

    this.urlBarSubmit.addEventListener(
      'click',
      this.importEventHandler.bind(this)
    );
    this.urlBarInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.importEventHandler(e);
      }
    });

    events.subscribe(Document.EVENT_RECEIVED_URL_CONTENT, (url, content) => {
      window.requestIdleCallback(() => {
        this.receiveContent(url, content);
      });
    });
  }

  importEventHandler(e) {
    e.preventDefault();
    const input = this.urlBarInput.value;
    const url =
      input.startsWith('http://') || input.startsWith('https://')
        ? input
        : `http://${input}`;
    if (url.match(URL_VALIDATION_REGEX)) {
      this.importURL(url);
    } else {
      this.importError('Please enter a valid URL');
      this.urlBarInput.focus();
    }
  }

  importURL(url) {
    events.publish(EVENT_REQUEST_URL_CONTENT, url);
    this.urlBarSubmit.classList.add('loading');
  }

  async receiveContent(url, response) {
    response
      .then((markup) => {
        this.importSuccess(url, markup);
      })
      .catch((e) => {
        this.importError(e);
      })
      .finally(() => {
        this.urlBarSubmit.classList.remove('loading');
      });
  }

  importSuccess(url, markup) {
    events.publish(Editor.EVENT_UPDATE_EDITOR_CONTENT, markup);
    this.urlBarLabel.classList.remove('show');
    this.setURLParams(url);
    this.toggle();
  }

  setURLParams(url) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('url', url);
    history.replaceState({}, '', newUrl.toString());
  }

  importError(e) {
    this.urlBarLabel.classList.add('show');
    this.urlBarLabel.innerText = e;
  }
}
