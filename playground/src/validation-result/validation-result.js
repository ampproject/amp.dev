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

import events from '../events/events.js';

import modes from '../modes/';
import * as Validator from '../validator/validator.js';
import * as Editor from '../editor/editor.js';

import template from './validation-result.hbs';
import './validation-result.scss';

export function createValidationResult() {
  if (!modes.IS_VALIDATOR) return;

  const target = document.getElementById('validation-result');
  return new ValidationResult(target);
}

class ValidationResult {
  /**
   * @param {Element} target  Where the item gets appended to
   */
  constructor(target) {
    this.target = target;
    this.active = false;

    // Delay initialization to when a page has been imported once
    events.subscribe(
      Editor.EVENT_UPDATE_EDITOR_CONTENT,
      () => this.active = true
    );

    events.subscribe(
      Validator.EVENT_NEW_VALIDATION_RESULT,
      (validationResult) => {
        this.validationResult = validationResult;
        this.render();
      }
    );

    this.render();
  }

  /**
   * Renders template with the information given in the validationResult
   * @return {Element}
   */
  render() {
    console.log(this);

    this.target.innerHTML = template({
      active: this.active,
      passed: this.validationResult?.status == 'PASS'
    });
  }
}
