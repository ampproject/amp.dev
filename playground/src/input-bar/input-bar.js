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

import './input-bar.scss';
import template from './input-bar.hbs';

import './autocomplete-item.scss';
import autocompleteItem from './autocomplete-item.hbs';

import {EventBus} from '../events/events.js';

export const EVENT_SELECT_AUTOCOMPLETE = 'event-select-autocomplete';

export default function createInput(target, config) {
  return new Input(target, config);
}

class Input {
  constructor(target, config) {
    target.insertAdjacentHTML('beforeend', template(config));

    this.container = target.querySelector('.input');
    this.input = target.querySelector('input');
    this.submit = target.querySelector('button');
    this.label = target.querySelector('label');

    if (config.autocomplete) {
      this.createAutocomplete(config.autocomplete);
    }

    this.eventBus = new EventBus();
  }

  subscribe(channel, observer) {
    this.eventBus.subscribe(channel, observer);
  }

  createAutocomplete(autocomplete) {
    this.autocomplete = this.container.querySelector('.input-bar-autocomplete');
    this.autocomplete
      .querySelector('.input-bar-autocomplete-header-close')
      .addEventListener('click', this.toggleAutocomplete.bind(this));

    this.input.addEventListener('focus', this.toggleAutocomplete.bind(this));

    if (autocomplete.options.length) {
      this.renderAutocompleteOptions(autocomplete.options);
    }
  }

  renderAutocompleteOptions(options) {
    const list = this.autocomplete.querySelector(
      '.input-bar-autocomplete-list'
    );
    list.innerHTML = '';

    for (const option of options) {
      const item = document.createElement('li');
      item.className = 'autocomplete-item';
      item.insertAdjacentHTML(
        'beforeend',
        autocompleteItem({
          option,
        })
      );

      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.input.value = option.id;
        this.eventBus.publish(EVENT_SELECT_AUTOCOMPLETE);
        this.toggleAutocomplete();
      });

      list.appendChild(item);
    }
  }

  toggleAutocomplete() {
    this.autocomplete.classList.toggle('active');
  }

  showError(error) {
    this.label.classList.add('show');
    this.label.innerText = error;
    this.input.focus();
  }

  hideError() {
    this.label.classList.remove('show');
  }

  toggleLoading(force) {
    this.submit.classList.toggle('loading', force);
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
  }

  set hidden(hide) {
    this.container.classList.toggle('hidden', hide);
  }
}
