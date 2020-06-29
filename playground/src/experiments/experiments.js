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

import './experiments.scss';
import template from './experiments.hbs';

import events from '../events/events.js';
import * as Button from '../button/button.js';
import * as Document from '../document/document.js';
import FlyIn from '../fly-in/base.js';
import createInput from '../input-bar/input-bar.js';

export function createExperimentalView(target, trigger) {
  return new Experimental(target, trigger);
}

class Experimental extends FlyIn {
  constructor(target, trigger) {
    super(target);

    this.target = target;
    this.trigger = Button.from(trigger, this.toggle.bind(this));

    this.content.insertAdjacentHTML('beforeend', template());

    // Add input bar partial
    const inputBar = createInput(
      document.getElementById('input-bar-experiments'), {
        label: 'Add',
        type: 'url',
        name: 'text',
        placeholder: 'Feature name'
      },
    );

    inputBar.submit.addEventListener('click', () => {
      console.log(inputBar.value);
      inputBar.showError(inputBar.value);
    });
  }

}
