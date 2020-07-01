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

import './fly-in.scss';
import events from '../events/events.js';
import template from './fly-in.hbs';
import * as FlyInBackground from './fly-in-background.js';

class FlyIn {
  constructor(target) {
    const content = document.createElement('div');
    content.className = 'fly-in-content';
    this.content = content;

    this.createFlyIn(target);
    this.registerButtons(target);

    events.subscribe(FlyInBackground.EVENT_FLY_IN_CLOSE, () => {
      this.toggle(false);
    });
  }

  createFlyIn(target) {
    const title = target.getAttribute('data-title');
    target.insertAdjacentHTML('afterbegin', template({title}));
    target.appendChild(this.content);

    return target;
  }

  render(content) {
    this.content.innerHTML = '';
    this.content.appendChild(content);
  }

  registerButtons(target) {
    const button = target.querySelector('.fly-in-close');
    button.addEventListener('click', () => {
      this.toggle(false);
    });
  }

  toggle(force) {
    this.target.classList.toggle('active', force);
  }
}

export default FlyIn;
