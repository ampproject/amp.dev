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

import './error-list.scss';

import events from '../events/events.js';
import modes from '../modes/';

import * as Button from '../button/button.js';
import * as Validator from '../validator/validator.js';
import * as ErrorListItem from './error-list-item.js';
import FlyIn from '../fly-in/base.js';

export function createErrorList() {
  const target = document.getElementById('error-list');

  if (modes.IS_DEFAULT) {
    const trigger = document.getElementById('error-indicator');
    return new FlyInErrorList(target, trigger);
  } else if (modes.IS_VALIDATOR) {
    return new InlineErrorList(target);
  }
}

class FlyInErrorList extends FlyIn {
  constructor(target, trigger) {
    super(target);
    console.log('created FlyInErrorList');
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
          this.trigger.removeClass('valid', 'warning', 'error');

          const errorCount = validationResult.errors.length;
          const plurality = errorCount > 1 ? 's' : '';

          if (validationResult.status == 'FAIL') {
            this.trigger.addClass('error');
            this.trigger.setHtml(`${errorCount}<span>Error${plurality}</span>`);
            return;
          }
          if (errorCount > 0) {
            this.trigger.addClass('warning');
            this.trigger.setHtml(
              `${errorCount}<span>Warning${plurality}</span>`
            );
            return;
          }

          this.trigger.addClass('valid');
          this.trigger.setHtml('valid');
        });
      }
    );
  }

  update(validationResult) {
    this.validationResult = validationResult;
    window.requestIdleCallback(() => {
      let content;
      if (!validationResult.errors.length) {
        content = document.createElement('span');
        content.innerText = 'No validation errors.';
      } else {
        content = document.createElement('ul');
        for (let i = 0; i < validationResult.errors.length; i++) {
          const error = validationResult.errors[i];
          ErrorListItem.createErrorListItem(content, error);
        }
        if (validationResult.errors.length === 0) {
          this.hideFlyIn();
        }
      }

      this.render(content);
    });
  }
}

class InlineErrorList {
  constructor() {
  }
}
