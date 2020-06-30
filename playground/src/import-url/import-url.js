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
import createInput from '../input-bar/input-bar.js';

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

    this.inputBar = createInput(document.getElementById('input-bar-url'), {
      label: 'Import',
      type: 'url',
      name: 'import-url',
      placeholder: 'Your URL',
    });

    this.inputBar.submit.addEventListener('click', (e) => {
      this.importEventHandler(e);
    });
    this.inputBar.input.addEventListener('keyup', (e) => {
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
    const input = this.inputBar.value;
    const url =
      input.startsWith('http://') || input.startsWith('https://')
        ? input
        : `http://${input}`;
    if (url.match(URL_VALIDATION_REGEX)) {
      this.inputBar.toggleLoading();
      events.publish(EVENT_REQUEST_URL_CONTENT, url);
    } else {
      this.inputBar.showError('Please enter a valid URL');
    }
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
        this.inputBar.toggleLoading();
        this.inputBar.hideError();
      });
  }

  importSuccess(url, markup) {
    events.publish(Editor.EVENT_UPDATE_EDITOR_CONTENT, markup);
    this.setURLParams(url);
    this.toggle();
  }

  setURLParams(url) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('url', url);
    history.replaceState({}, '', newUrl.toString());
  }
}
