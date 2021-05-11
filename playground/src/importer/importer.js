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

import './importer.scss';
import template from '../importer/importer.hbs';

import events from '../events/events.js';
import modes from '../modes/';
import createInput from '../input-bar/input-bar.js';
import createFileUpload from '../file-upload/file-upload.js';

import * as Button from '../button/button.js';
import * as Document from '../document/document.js';
import FlyIn from '../fly-in/fly-in.js';
import * as Editor from '../editor/editor.js';
import * as FileUpload from '../file-upload/file-upload.js';
import * as EmailLoader from '../email-loader/email-loader.js';
import * as Runtimes from '../runtime/runtimes.js';

export const EVENT_REQUEST_URL_CONTENT = 'event-request-url-content';

/* eslint-disable max-len */
const URL_VALIDATION_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

export function createImport() {
  const target = document.getElementById('import-view');
  if (modes.IS_DEFAULT) {
    const trigger = document.getElementById('import-toggle');
    return new FlyInImporter(target, trigger);
  } else if (modes.IS_VALIDATOR) {
    return new InlineImporter(target);
  }
}

/**
 * Creates a input bar that takes a URL which is used to load
 * a page into the playground
 */
class Importer {
  /**
   * @param {Element} target
   */
  constructor(target, label, helpText) {
    if (modes.IS_DEFAULT) {
      this.fileUpload = createFileUpload(target, {
        acceptedFiles: 'message/rfc822',
        url: '#',
      });
      this.emailLoader = EmailLoader.createEmailLoader();

      this.fileUpload.subscribe(
        FileUpload.EVENT_FILE_UPLOADED,
        this.emailLoader.loadEmailContent.bind(this.emailLoader)
      );

      this.emailLoader.subscribe(
        EmailLoader.EVENT_LOAD_EMAIL_ERROR,
        this.fileUpload.showError.bind(this.fileUpload)
      );
    }

    this.inputBar = createInput(target, {
      helpText: helpText,
      label: label,
      type: 'url',
      name: 'import',
      placeholder: 'Your URL',
    });

    this.inputBar.submit.addEventListener('click', this.onSubmitUrl.bind(this));
    this.inputBar.input.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.onSubmitUrl(e);
      }
    });

    events.subscribe(
      Document.EVENT_RECEIVE_URL_CONTENT,
      this.onReceiveURLContent.bind(this)
    );
  }

  onSubmitUrl(e) {
    e.preventDefault();
    const value = this.inputBar.value;
    const url =
      value.startsWith('http://') || value.startsWith('https://')
        ? value
        : `http://${value}`;
    if (url.match(URL_VALIDATION_REGEX)) {
      this.inputBar.toggleLoading();
      events.publish(EVENT_REQUEST_URL_CONTENT, url);
    } else {
      this.inputBar.showError('Error: Please enter a valid URL');
    }
  }

  onReceiveURLContent(url, response) {
    this.inputBar.value = url;

    response
      .then((html) => {
        events.publish(Editor.EVENT_UPDATE_EDITOR_CONTENT, html);

        // Update URL for the client to create a shareable state
        const clientUrl = new URL(window.location.href);
        clientUrl.searchParams.set('url', url);
        window.history.replaceState({}, '', clientUrl.toString());

        this.inputBar.hideError();
      })
      .catch((e) => {
        this.inputBar.showError(e);
      })
      .finally(() => {
        this.inputBar.toggleLoading(false);
      });
  }

  render(runtime) {
    this.inputBar.hidden = runtime.id != 'amphtml';
    this.fileUpload.hidden = runtime.id != 'amp4email';
  }
}

/**
 * The import functionality shown in a layer
 * @extends FlyIn
 */
class FlyInImporter extends FlyIn {
  constructor(target, trigger) {
    super(target);

    this.target = target;
    this.trigger = Button.from(trigger, this.toggle.bind(this));
    this.content.insertAdjacentHTML('beforeend', template());

    this.importer = new Importer(
      this.content.querySelector('#import-container'),
      'Import',
      "Enter a valid URL to import the page's markup into the editor."
    );

    events.subscribe(
      Editor.EVENT_UPDATE_EDITOR_CONTENT,
      this.onUpdateEditorContent.bind(this)
    );

    events.subscribe(Runtimes.EVENT_SET_RUNTIME, this.onSetRuntime.bind(this));
  }

  /**
   * Fired when editor content is updated under the assumption
   * that the update could be in consequence of a successful import
   * @return {undefined}
   */
  onUpdateEditorContent() {
    this.toggle(false);
  }

  /**
   * Fired when a new runtime is selected in order to hide
   * the trigger for AMP4Email as it has a different import logic
   * @return {undefined}
   */
  onSetRuntime(runtime) {
    this.importer.render(runtime);
  }
}

/**
 * Importer functionality as used for the validator, shown inline
 * with slightly different wording
 */
class InlineImporter {
  constructor(target) {
    target.insertAdjacentHTML('beforeend', template());

    this.importer = new Importer(
      target.querySelector('#import-container'),
      'Validate'
    );
  }
}
