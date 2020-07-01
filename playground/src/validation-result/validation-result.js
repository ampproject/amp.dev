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
import * as Validator from '../validator/validator.js';

import template from './validation-result.hbs';

export function createValidationResult() {
  const target = document.getElementById('validation-result');
  return new ValidationResult(target);
}

class ValidationResult {
  /**
   * @param {Element} target  Where the item gets appended to
   * @param {Object} details Holds information about the error
   */
  constructor(target) {

    events.subscribe(
      Validator.EVENT_NEW_VALIDATION_RESULT,
      (validationResult) => {
        this.validationResult = validationResult;
        this.render();
      }
    );
  }

  /**
   * Renders template with the information given in the validationResult
   * @return {Element}
   */
  render() {
    console.log(this.validationResult);
    if (!this.validationResult) {
      return;
    }

    // const element = document.createElement('template');
    // element.innerHTML = template(this.details);
    //
    // return element.content.firstChild;
  }
}
