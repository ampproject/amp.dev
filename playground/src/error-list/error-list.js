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

require('./error-list.scss');

import events from '../events/events.js';
import * as Button from '../button/button.js';
import * as Validator from '../validator/validator.js';
import FlyIn from '../fly-in/base.js';

export const EVENT_ERROR_SELECTED = 'error-selected';

export function createErrorList(target, trigger) {
  return new ErrorList(target, trigger);
}

class ErrorList extends FlyIn {
  constructor(target, trigger) {
    super(target);

    this.target = target;
    this.trigger = Button.from(trigger, this.toggle.bind(this));

    // configure validator
    events.subscribe(
      Validator.EVENT_NEW_VALIDATION_RESULT,
      (validationResult) => {
        this.update(validationResult);
        window.requestIdleCallback(() => {
          if (validationResult === Validator.NO_VALIDATOR) {
            this.trigger.setHtml('valid');
            this.trigger.disable();
            return;
          }
          this.trigger.enable();
          if (validationResult.status == 'PASS') {
            this.trigger.setHtml('valid');
            this.trigger.disable();
            return;
          }
          this.trigger.enable();
          this.trigger.setHtml(
            validationResult.errors.length +
              ' Error' +
              (validationResult.errors.length > 1 ? 's' : '')
          );
        });
      }
    );
  }

  update(validationResult) {
    this.validationResult = validationResult;
    window.requestIdleCallback(() => {
      /* eslint-disable max-len */
      const content = document.createElement('ul');
      for (let i = 0; i < validationResult.errors.length; i++) {
        const error = validationResult.errors[i];
        content.appendChild(this.renderError(error, i));
      }

      /* eslint-enable max-len */
      if (validationResult.errors.length === 0) {
        this.hideFlyIn();
      }

      this.upadateContent(content);
    });
  }

  renderError(error, index) {
    const errorElement = document.createElement('li');
    errorElement.className = `validation-error ${error.icon}`;
    errorElement.dataset.index = index;

    errorElement.innerHTML = `<div>
        <p class="message">
          ${error.message}
          <a href="${error.specUrl}" target="_blank" rel="noopener">
            Learn&nbsp;more
          </a>
        </p>
        <div class="location">line ${error.line}, column ${error.col}</div>
      </div>`;

    errorElement.addEventListener('click', this.onErrorItemClick.bind(this));

    return errorElement;
  }

  onErrorItemClick(e) {
    const target = e.target.closest('li.validation-error');
    if (!target) {
      this.hideErrorList();
      return;
    }

    const index = target.dataset.index;
    const error = this.validationResult.errors[index];
    events.publish(EVENT_ERROR_SELECTED, error);
  }
}
